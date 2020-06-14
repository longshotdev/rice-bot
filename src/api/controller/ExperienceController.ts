import IExperienceController, { IE, User } from "./IExperienceController";
import { Snowflake, Guild } from "discord.js";
import { Document } from "mongoose";

interface getAndUpdateCallback {
  (cfg: User): User;
}
async function getGuildUsers(guildid: Guild | Snowflake): Promise<IE> {
  if (guildid instanceof Guild) guildid = guildid.id;
  if (!(await doesGuildExist(guildid))) await createGuildDefault(guildid);
  let data = IExperienceController.findOne({ guild: guildid });
  if (!data) createGuildDefault(guildid);
  return <IE>(<unknown>data);
}
/**
 * Update a user
 * @param guild Taking in Actual fucking ID cause suck my dick i dont want waste time on gettting id more code shit
 * @param userid id for user to update
 */
async function updateUser(guild: Snowflake, userid: Snowflake) {
  if (!(await doesGuildExist(guild))) createGuildDefault(guild); // check if guild exists
  await doesUserExist(guild, userid);
  return;
}
/**
 * Get's User by ID.
 * @param guild Guild ID
 * @param userid User ID
 */
async function getUser(guild: Snowflake, userid: Snowflake): Promise<User> {
  if (!(await doesGuildExist(guild))) createGuildDefault(guild); // check if guild exists
  return await doesUserExist(guild, userid);
}

async function getAndUpdateUser(
  guildid: Snowflake,
  userid: Snowflake,
  cb: getAndUpdateCallback
): Promise<IE> {
  let user = await doesUserExist(guildid, userid);
  let { experience, level } = cb(user);
  if (isNaN(experience)) experience = 0;
  if (isNaN(level)) level = 1;
  let data = await IExperienceController.findOneAndUpdate(
    { guild: guildid, "users.id": userid },
    {
      $set: {
        "users.$.experience": experience,
        "users.$.level": level,
      },
    },
    { upsert: true, new: true }
  );
  await data.save();
  return <IE>(<unknown>data);
}
export default {
  getGuildUsers,
  updateUser,
  getUser,
  getAndUpdateUser,
};
async function doesGuildExist(guildid: Guild | Snowflake): Promise<Boolean> {
  if (guildid instanceof Guild) guildid = guildid.id;
  return IExperienceController.exists({ guild: guildid });
}
async function createGuildDefault(
  guildid: Guild | Snowflake
): Promise<void | IE> {
  if (guildid instanceof Guild) guildid = guildid.id;
  let data = await IExperienceController.create({
    guild: guildid,
    users: [],
  });
  await data.save();
  return <IE>(<unknown>data);
}
async function doesUserExist(
  guild: Snowflake,
  userid: Snowflake
): Promise<User> {
  if (!(await doesGuildExist(guild))) await createGuildDefault(guild); // check if guild exists
  let data = await IExperienceController.findOne({ guild: guild });
  let serverObj = <IE>(<unknown>data);
  if (!serverObj.users.some((user) => user.id === userid)) {
    let model = await IExperienceController.findOneAndUpdate(
      { guild: guild },
      {
        $push: {
          users: {
            id: userid,
            experience: 0,
            level: 1,
          },
        },
      },
      { upsert: true, new: true },
      (err, model: Document) => {
        if (err) throw err;
        model.save();
      }
    );
    let modelData = <IE>(<unknown>model);
    let user = modelData.users.find((user) => user.id === user.id)!;
    return user;
  }
  let user = serverObj.users.find((user) => user.id === user.id)!;
  return user;
}

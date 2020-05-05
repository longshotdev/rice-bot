import GuildSettingsModel, { IConfig } from "./IGuildSettingsController";
import { Snowflake, Guild } from "discord.js";
import { Document } from "mongoose";
import { IGuildSettings } from "./IGuildSettingsController";

/**
 *
 * @param guildID Guild ID to search from.
 * @returns {Boolean} True if guild does exist.
 */
async function doesGuildExist(guildID: Snowflake) {
  return GuildSettingsModel.exists({ id: guildID });
}

async function getGuild(guildID: Snowflake): Promise<Document | null> {
  return await GuildSettingsModel.findOne({ id: guildID });
}
async function createGuildSettings(
  guild: Guild,
  config?: IConfig
): Promise<Document | undefined> {
  let cfg: IConfig = {
    prefix: ["+"],
    xp: true,
    nsfw: false,
    logChannel: "ASD",
    EventJoin: false,
    disabledCommands: [],
  };
  if (config) cfg = config;
  GuildSettingsModel.create({
    id: guild.id,
    owner: guild.ownerID,
    guildCreationDate: guild.createdAt,
    BotJoinDate: guild.joinedAt,
    config: cfg,
  })
    .then((data: Document) => {
      data.save();
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
  return undefined;
}
async function ensureGuild(guild: Guild): Promise<IGuildSettings> {
  // checks to see if guild exists.
  if (!(await doesGuildExist(guild.id))) {
    return await createGuildSettings(guild).then((doc: any) => {
      const document = <Document>doc;
      return <IGuildSettings>(<unknown>document);
    });
  } else {
    const g: Document | null = await getGuild(guild.id);
    if (g === null)
      return Promise.reject(
        "this is not supposed to happen?!?!?!?!?!?!?!?!?!?!"
      );
    return Promise.resolve(<IGuildSettings>(<unknown>g));
  }
}
export default {
  doesGuildExist,
  getGuild,
  ensureGuild,
  createGuildSettings,
};

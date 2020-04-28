/*
 * File: GuildSettings.controller.ts
 * Project: ricebot
 * File Created: Tuesday, 21st April 2020 4:25:12 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 21st April 2020 4:25:12 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import GuildSettingsModel, {
  IGuildSettings,
  EConfigActions,
} from "./IGuildSettings";
import { Snowflake, Guild } from "discord.js";
import { Document } from "mongoose";

async function createGuildSettings({
  id,
  owner,
  guildCreationDate,
  BotJoinDate,
  config,
}: IGuildSettings): Promise<void> {
  GuildSettingsModel.create({
    id,
    owner,
    guildCreationDate,
    BotJoinDate,
    config,
  })
    .then((data: Document) => {
      data.save();
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
async function doesGuildExist(guildID: Snowflake): Promise<boolean> {
  return GuildSettingsModel.exists({ id: guildID });
}
/**
 * @deprecated Use `#ensureGuild` instead.
 * @param guildID Guild ID to search with.
 */
async function findGuild(guildID: Snowflake): Promise<Document | null> {
  return await GuildSettingsModel.findOne({ id: guildID });
}
async function removeGuild(guildID: Snowflake): Promise<void> {
  GuildSettingsModel.deleteOne({ id: guildID });
}
async function ensureGuild(guild: Guild | null): Promise<IGuildSettings> {
  if (guild === null) throw new Error("No Guild Found.");
  if (!(await doesGuildExist(guild.id))) {
    await createGuildSettings({
      id: guild.id,
      BotJoinDate: guild.joinedAt,
      guildCreationDate: guild.createdAt,
      owner: guild.id,
      config: {
        prefix: ["+"],
        xp: true,
        nsfw: false,
        logChannel: "ASD",
        EventJoin: false,
        disabledCommands: [],
      },
    });
  }
  const fG: Document | null = await findGuild(guild.id);
  // guild[0] must be IGuildSettings and fuck you
  if (fG === null) return Promise.reject("Could not find guild settings.");

  return Promise.resolve(<IGuildSettings>(<unknown>fG));
}

async function changeConfig(
  guild: Guild,
  action: EConfigActions,
  key: any,
  value: any
): Promise<IGuildSettings> {
  const id = guild.id;
  if (action !== EConfigActions.set) return Promise.reject();
  switch (key) {
    case "prefix":
      GuildSettingsModel.findOneAndUpdate(
        { id: id },
        { $push: { "config.prefix": value } },
        { upsert: true },
        async (err, _doc) => {
          if (err) throw new Error("fucky? changey config?");
          return await findGuild(id);
        }
      );
      break;
    case "xp":
      GuildSettingsModel.findOneAndUpdate(
        { id: id },
        { xp: <boolean>value },
        { upsert: true },
        (err, _doc) => {
          if (err) throw new Error("fucky? changey config?");
          console.log(findGuild(id));
          return findGuild(id);
        }
      );
      break;
    case "nsfw":
      GuildSettingsModel.findOneAndUpdate(
        { id: id },
        { nsfw: <boolean>value },
        { upsert: true },
        (err, _doc) => {
          if (err) throw new Error("fucky? changey config?");
          return _doc;
        }
      );
      break;
    case "joinRole":
      GuildSettingsModel.findOneAndUpdate(
        { id: id },
        { joinRole: value },
        { upsert: true },
        (err, _doc) => {
          if (err) throw new Error("fucky? changey config?");
          return findGuild(id);
        }
      );
      break;
    case "EventJoin":
      GuildSettingsModel.findOneAndUpdate(
        { id: id },
        { EventJoin: <boolean>value },
        { upsert: true },
        (err, _doc) => {
          if (err) throw new Error("fucky? changey config?");
          return findGuild(id);
        }
      );
      break;
    default:
      return ensureGuild(guild);
  }
  return ensureGuild(guild);
}
/**
 * @deprecated dont use.
 * @private
 * @param guildID testo
 */
async function testo(guildID: any): Promise<void> {
  GuildSettingsModel.findOneAndUpdate(
    { id: guildID },
    { $push: { "config.prefix": "V" } },
    { upsert: true },
    (err, _doc) => {
      if (err) throw err;
      console.log(_doc);
      _doc?.save();
    }
  );
}
export default {
  createGuildSettings,
  doesGuildExist,
  findGuild,
  removeGuild,
  ensureGuild,
  changeConfig,
  testo,
};

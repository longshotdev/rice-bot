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
import GuildSettingsModel, { IGuildSettings } from "./IGuildSettings";
import { Snowflake, Guild } from "discord.js";
import { Document } from "mongoose";

async function createGuildSettings({
  id,
  owner,
  guildCreationDate,
  BotJoinDate,
  config,
}: IGuildSettings): Promise<IGuildSettings> {
  return GuildSettingsModel.create({
    id,
    owner,
    guildCreationDate,
    BotJoinDate,
    config,
  })
    .then((data: any) => {
      return <IGuildSettings>data;
    })
    .catch((error: Error) => {
      throw error;
    });
}
async function doesGuildExist(guildID: Snowflake): Promise<boolean> {
  return GuildSettingsModel.exists({ id: guildID });
}
async function findGuild(guildID: Snowflake): Promise<Document | null> {
  return GuildSettingsModel.findOne({ id: guildID });
}
async function removeGuild(guildID: Snowflake): Promise<void> {
  GuildSettingsModel.deleteOne({ id: guildID });
}
async function ensureGuild(guild: Guild | null): Promise<IGuildSettings> {
  if (guild === null) throw new Error("FYUCK YOU BITCH");
  if (!doesGuildExist(guild.id)) {
    return await createGuildSettings({
      id: guild.id,
      BotJoinDate: guild.joinedAt,
      guildCreationDate: guild.createdAt,
      owner: guild.id,
      config: {
        prefix: ["+"],
        xp: true,
        nsfw: false,
        logChannel: "ASD",
        disabledCommands: [],
      },
    });
  }
  const fG: Document | null = await findGuild(guild.id);
  // guild[0] must be IGuildSettings and fuck you
  if (fG === null) return Promise.reject("FUCK YOU");

  return Promise.resolve(<IGuildSettings>(<unknown>fG));
}
export default {
  createGuildSettings,
  doesGuildExist,
  findGuild,
  removeGuild,
  ensureGuild,
};

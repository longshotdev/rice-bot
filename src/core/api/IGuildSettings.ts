import mongoose, { Schema } from "mongoose";
import { Snowflake } from "discord.js";
/*
 * File: IGuildSettings.ts
 * Project: ricebot
 * File Created: Tuesday, 21st April 2020 4:05:12 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 21st April 2020 4:05:12 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
interface IConfig {
  prefix: Array<String>;
  xp: boolean;
  nsfw: boolean;
  disabledCommands?: Array<Snowflake>;
  logChannel: Snowflake;
  EventJoin: boolean;
  joinRole?: string;
}
export interface IGuildSettings {
  id: Snowflake;
  owner: Snowflake;
  guildCreationDate: Date;
  BotJoinDate: Date;
  config: IConfig;
}
export enum EConfigActions {
  set,
  get,
  reset,
  list,
  remove,
}
const GuildSettingsSchema = new Schema({
  id: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  guildCreationDate: { type: Date, required: true },
  BotJoinDate: { type: Date, required: true },
  config: {
    prefix: { type: Array, required: true },
    xp: { type: Boolean, required: true },
    nsfw: { type: Boolean, required: true },
    disabledCommands: { type: Array, required: true },
    EventJoin: { type: Boolean, required: true },
    logChannel: { type: String, required: true },
    joinRole: { type: String, required: false },
  },
});
export default mongoose.model("GuildSettings", GuildSettingsSchema);

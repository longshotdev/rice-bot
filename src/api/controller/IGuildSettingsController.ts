import mongoose, { Schema } from "mongoose";
import { Snowflake } from "discord.js";

/**
 * Key = config | false
 *
 *
 */
// TODO: MAKE SURE THIS IS FUCKING TYPE CHECKED WHEN YOU LOOK AT IT OKAY? THANK YOU MOTHER FUCKER.
export interface IConfig {
  prefix: Array<string>;
  xp: boolean;
  nsfw: boolean;
  //  allowedCommandsPerChannel: Map<string, boolean>;
  logChannel: Snowflake;
  EventJoin: boolean;
  joinRole?: string;
  disabledCommandsPerChannel: Map<Snowflake, Array<String> | "all">;
  disabledCategoriesPerChannel: Map<Snowflake, Array<String>>;
  disabledModulesPerChannel: Map<Snowflake, Array<String>>;
  disabledCommandsServerWide: Array<string> | "all";
  disabledCategoriesServerWide: Array<string> | "all";
  disabledModulesServerWide: Array<string> | "all";
}
// Server Wide > Channel | Modules > Categories > Commands

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
    disabledCommandsPerChannel: { type: Map, required: false },
    disabledCategoriesPerChannel: { type: Map, required: false },
    disabledModulesPerChannel: { type: Map, required: false },
    disabledCommandsServerWide: { type: Array, required: false },
    disabledCategoriesServerWide: { type: Array, required: false },
    disabledModulesServerWide: { type: Array, required: false },
  },
});

export default mongoose.model("GuildSettings", GuildSettingsSchema);

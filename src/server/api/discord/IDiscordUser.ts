import { Request } from "express";
import { Snowflake } from "discord.js";

export interface IUser {
  id: Snowflake;
  username: String;
  avatar: String;
  discriminator: String;
  public_flags: Number;
  flags: Number;
  email: String;
  verified: Boolean;
  locale: String;
  mfa_enabled: Boolean;
  provider: String;
  accessToken: String;
  fetchedAt: String;
}
export default interface IDiscordUser extends Request {
  user: IUser;
}

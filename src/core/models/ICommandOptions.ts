import { PermissionFlags } from "discord.js";

interface ICommandOptions {
  name: string;
  enable: boolean;
  cooldown: number;
  runIn: string[];
  aliases?: Array<string>;
  permLevel: number;
  description?: string;
  usage: string;
  perms?: Array<PermissionFlags>;
  usageDelimiter?: string;
}

export default ICommandOptions;

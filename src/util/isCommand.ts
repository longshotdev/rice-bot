import { GSController } from "../api";
import { Message } from "discord.js";

export default async function (message: Message): Promise<boolean> {
  let prefix = "+";
  const guildSettings = await GSController.getGuild(message.guild!);
  for (const pfx of guildSettings.config.prefix) {
    if (message.content.startsWith(pfx)) prefix = pfx;
  }
  if (!message.content.startsWith(prefix)) return false;
  return true;
}

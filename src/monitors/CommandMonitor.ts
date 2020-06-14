import Monitor from "../core/models/Monitor";
import { Message } from "discord.js";
import Rice from "../Rice";
import { GSController } from "../api";
export default class extends Monitor {
  constructor() {
    super({
      enabled: true,
      name: "Command Monitor",
    });
  }
  public async run(message: Message, client: Rice): Promise<Message | void> {
    if (!message.guild) return;
    let prefix = "+";
    const guildSettings = await GSController.ensureGuild(message.guild);
    for (const pfx of guildSettings.config.prefix) {
      if (message.content.startsWith(pfx)) prefix = pfx;
    }
    if (message.mentions.has(client.user!)) {
      return message.reply(`My prefix is \`${prefix}\``);
    }
    if (!message.content.startsWith(prefix)) return; // this is to ensure that if the user did not use +, they wont get fucked dong

    const command = message.content.slice(prefix.length).trim().split(/ +/g);
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)
      .reverse();
    args.pop();
    args.reverse();

    const commandRunnable =
      client.commandRegistry.getCommandStore.get(command[0].toLowerCase()) ||
      client.commandRegistry.getCommandStore.aliasStore.get(
        command[0].toLowerCase()
      );
    if (!commandRunnable) return;
    commandRunnable.run(client, message, args).catch((e: Error) => {
      message.channel.send(
        `There was an error executing your command. \n \`\`\`${e.message}\`\`\``
      );
    });
  }
}

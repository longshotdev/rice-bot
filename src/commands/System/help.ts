import Command from "../../core/Command";
import { Message } from "discord.js";
import Rice from "../../Rice";

/*
 * File: help.ts
 * Project: ricebot
 * File Created: Saturday, 18th April 2020 6:56:26 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2020 6:56:26 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
class Help extends Command {
  constructor() {
    super({
      name: "help",
      cooldown: 0,
      enable: true,
      permLevel: 0,
      runIn: ["text"],
      usage: "",
      aliases: [],
      description: "Displays help for a command",
      usageDelimiter: "????",
    });
  }
  async run(message: Message, [..._args], client: Rice): Promise<Message> {
    const help: any = await this.buildHelp(client);
    const categories = Object.keys(help);
    const helpMessage = [];
    for (let cat = 0; cat < categories.length; cat++) {
      helpMessage.push(`**${categories[cat]} Commands**: \`\`\`asciidoc`, "");
      helpMessage.push(`${help[categories[cat]].join("\n")}\n`);
      helpMessage.push("```\n\u200b");
    }

    return message.channel.send(helpMessage, { split: { char: "\u200b" } });
  }
  async buildHelp(client: Rice) {
    const help: any = {};
    const commandNames = Array.from(client.CommandStore.store.keys());
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0
    );
    await Promise.all(
      client.CommandStore.store.map((command) => {
        if (!help.hasOwnProperty(command.category)) help[command.category] = [];
        help[command.category].push(
          `+${command.name.padEnd(longest)} :: ${command.description}`
        );
        return command.category;
      })
    );

    return help;
  }
}

module.exports = Help;

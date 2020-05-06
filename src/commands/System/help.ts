import Command from "../../core/models/Command";
import Rice from "../../Rice";
import { Message } from "discord.js";
export default class extends Command {
  constructor() {
    super({
      name: "help",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(client: Rice, message: Message): Promise<Message | void> {
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
    const commandNames = Array.from(
      client.commandRegistry.getCommandStore.getStore.keys()
    );
    const longest = commandNames.reduce(
      (long, str) => Math.max(long, str.length),
      0
    );
    await Promise.all(
      client.commandRegistry.getCommandStore.getStore.map((command) => {
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

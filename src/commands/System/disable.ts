import Command from "../../core/models/Command";
import { Message } from "discord.js";

export default class extends Command {
  constructor() {
    super({
      name: "disable",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "<string> <string>",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(message: Message, args: any): Promise<Message | void> {
    console.log(args);
    message.channel.send(args);
  }
}

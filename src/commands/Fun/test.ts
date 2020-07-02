import Command from "../../core/models/Command";
import { Message } from "discord.js";

export default class extends Command {
  constructor() {
    super({
      name: "true",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(message: Message, [..._args]): Promise<Message | void> {
    message.channel.send("hola como estas " + _args);
  }
}

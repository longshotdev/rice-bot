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
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(_message: Message): Promise<Message | void> {}
}

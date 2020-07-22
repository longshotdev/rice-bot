import Command from "../../core/models/Command";
import { Message } from "discord.js";

export default class extends Command {
  constructor() {
    super({
      name: "config",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "<set|remove|reset|show:default> (key:K) (value:V)",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(_message: Message, args: any): Promise<Message | void> {
    console.log(args);
  }
}

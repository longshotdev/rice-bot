import Command from "../../core/models/Command";
import { Message } from "discord.js";
export default class extends Command {
  constructor() {
    super({
      name: "kick",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "<user> <reason>",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(_message: Message, _args: any): Promise<void> {
    console.log(_args);
    console.log("RAN KICK CMD");
  }
}

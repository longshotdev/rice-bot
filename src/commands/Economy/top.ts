import Command from "../../core/models/Command";
import Rice from "../../Rice";
import { Message } from "discord.js";
import ExperienceController from "../../api/controller/ExperienceController";

export default class extends Command {
  constructor() {
    super({
      name: "top",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "top",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(_client: Rice, message: Message): Promise<Message | void> {
    let guildData = await ExperienceController.getGuildUsers(message.guild!.id);
    console.log(guildData);
  }
}

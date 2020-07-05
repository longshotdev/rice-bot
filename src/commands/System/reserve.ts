import Command from "../../core/models/Command";
import { Message } from "discord.js";
import { GSController } from "../../api";
export default class extends Command {
  constructor() {
    super({
      name: "reserve",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description:
        "Reserves VC for {x} amt of people. You choose who gets moved in.",
      aliases: [],
    });
  }
  public async run(message: Message): Promise<Message | void> {
    message.channel.send(
      `\`\`\`json ${
        (await GSController.getGuild(message.guild!)).config.modules
      }\`\`\``
    );
  }
}

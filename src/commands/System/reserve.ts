import Command from "../../core/models/Command";
import Rice from "../../Rice";
import { Message } from "discord.js";

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
  public async run(
    _client: Rice,
    message: Message,
    [..._args]
  ): Promise<Message | void> {
    let timer = _args[0];
    message.channel.send("reserved for " + timer + " minutes.");
  }
}

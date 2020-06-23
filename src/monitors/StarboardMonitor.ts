import Monitor from "../core/models/Monitor";
import { Message, MessageReaction, User } from "discord.js";
export default class extends Monitor {
  constructor() {
    super({
      enabled: true,
      name: "starboard",
      allowedTypes: ["guild"],
      emitsOnlyIn: [],
      emitsOnEvent: ["messageReactionAdd"],
    });
  }
  public async run(
    messageReaction: MessageReaction,
    _user: User
  ): Promise<Message | void> {
    console.log(messageReaction);
  }
}

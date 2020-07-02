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
    user: User
  ): Promise<Message | void> {
    if (messageReaction.emoji.name != "⭐") return;
    if (messageReaction.message.author.id === user.id)
      return messageReaction.message.channel.send(
        `${user}, you cannot star your own messages.`
      );
    messageReaction.message.channel.send("ok ur message has been starred.");
  }
}

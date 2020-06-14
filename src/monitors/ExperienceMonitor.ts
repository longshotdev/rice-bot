import Monitor from "../core/models/Monitor";
import { Message } from "discord.js";
import Rice from "../Rice";
import ExperienceController from "../api/controller/ExperienceController";
import { User } from "../api/controller/IExperienceController";

export default class extends Monitor {
  constructor() {
    super({
      enabled: true,
      name: "Experience Monitor",
      allowedTypes: ["guild"],
    });
  }
  public async run(message: Message, _client: Rice): Promise<Message | void> {
    if (message.guild) {
      ExperienceController.getAndUpdateUser(
        message.guild.id,
        message.author.id,
        (user: User): User => {
          let experience = user.experience + 1;
          let curLevel = Math.floor(0.7 * Math.sqrt(user.experience));
          if (user.level < curLevel) {
            message.reply(
              `You've leveled up to level **${curLevel}**! Good job idiot.`
            );
          }
          return {
            experience,
            id: message.author.id,
            level: curLevel,
          };
        }
      );
    }
  }
}

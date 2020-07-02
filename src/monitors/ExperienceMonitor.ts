import Monitor from "../core/models/Monitor";
import { Message, Snowflake } from "discord.js";
import Rice from "../Rice";
import ExperienceController from "../api/controller/ExperienceController";
import { User } from "../api/controller/IExperienceController";
import isCommand from "../util/isCommand";
import GuildSettingController from "../api/controller/GuildSettingController";

export default class extends Monitor {
  private experienceTimeout: Set<Snowflake> = new Set<Snowflake>();
  constructor() {
    super({
      enabled: true,
      name: "experience",
      allowedTypes: ["guild"],
      emitsOnlyIn: [],
      emitsOnEvent: ["message"],
    });
  }
  public async run(message: Message, _client: Rice): Promise<Message | void> {
    if (
      (await GuildSettingController.getGuild(message.guild!)).config.modules.xp
    ) {
      if (message.guild && !(await isCommand(message))) {
        if (this.experienceTimeout.has(message.author.id)) return;
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
            this.experienceTimeout.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after 2.5 seconds
              this.experienceTimeout.delete(message.author.id);
            }, 60000); // TODO: make this able for guild settings change shit fuck
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
}

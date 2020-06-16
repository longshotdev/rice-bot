import Module from "./Module";
import { Snowflake } from "discord.js";
import GuildSettingController from "../api/controller/GuildSettingController";
import Rice from "../Rice";

class ExperienceModule extends Module {
  public static async run(guildid: Snowflake): Promise<boolean> {
    let guild = await GuildSettingController.getGuild(
      Rice.getInstance().guilds.cache.find((g) => g.id === guildid)!
    );
    if (guild.config.xp) return true;
    return false;
  }
}

export default ExperienceModule;

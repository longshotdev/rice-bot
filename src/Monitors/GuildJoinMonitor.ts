import { Guild } from "discord.js";

/*
 * File: GuildJoinMonitor.ts
 * Project: ricebot
 * File Created: Saturday, 18th April 2020 7:35:12 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2020 7:35:12 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import Rice from "../Rice";
import GSController from "../core/api/GuildSettings.controller";
import Logger from "../util/Logger";

class GuildJoinMonitor {
  async run(guild: Guild, _client: Rice) {
    if (guild && !(await GSController.doesGuildExist(guild.id))) {
      GSController.createGuildSettings({
        id: guild.id,
        owner: guild.id,
        guildCreationDate: guild.createdAt,
        BotJoinDate: guild.joinedAt,
        config: {
          prefix: ["+"],
          logChannel: "ASF",
          nsfw: false,
          xp: true,
        },
      })
        .then(() => {
          Logger.log(`Joined Guild: ${guild.name}`, Logger.levels.INFO);
        })
        .catch((err) => {
          throw err;
        });
    }
    return null;
  }
}
export default GuildJoinMonitor;

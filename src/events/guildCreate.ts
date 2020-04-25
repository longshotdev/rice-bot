import Event from "../core/Event";
import Rice from "../Rice";
import { Guild } from "discord.js";

/*
 * File: guildCreate.ts
 * Project: ricebot
 * File Created: Thursday, 23rd April 2020 5:03:01 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 23rd April 2020 5:03:01 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import GSController from "../core/api/GuildSettings.controller";
import Logger from "../util/Logger";

class guildCreate extends Event {
  constructor() {
    super("guildCreate", true);
  }
  public async run(_client: Rice, [guild, ..._args]: Guild | any) {
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
module.exports = guildCreate;

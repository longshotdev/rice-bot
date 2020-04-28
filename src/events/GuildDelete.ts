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
import Event from "../core/Event";
import { Guild } from "discord.js";

module.exports = class GuildDeleteMonitor extends Event {
  constructor() {
    super("guildDelete", true);
  }
  public async run(_client: Rice, [guild, ..._args]: Guild[]): Promise<void> {
    if (await GSController.doesGuildExist(guild.id)) {
      GSController.removeGuild(guild.id)
        .then(() => {
          Logger.log(`Left Guild: ${guild.name}`, Logger.levels.INFO);
        })
        .catch((err) => {
          throw err;
        });
    }
  }
};

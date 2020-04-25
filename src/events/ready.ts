/*
 * File: ready.ts
 * Project: ricebot
 * File Created: Friday, 24th April 2020 4:02:52 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Friday, 24th April 2020 4:02:53 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import Rice from "../Rice";
import Event from "../core/Event";
import Logger from "../util/Logger";
import chalk from "chalk";

module.exports = class extends Event {
  constructor() {
    super("ready", true);
  }
  public async run(client: Rice, ..._args: any): Promise<void> {
    Logger.log(
      `Rice Farming in ${chalk.yellow.bold(client.guilds.cache.size)} servers!`,
      Logger.levels.INFO
    );
    client.user?.setActivity({
      name: `${client.guilds.cache.size} Rice Fields`,
      type: "WATCHING",
    });
    return;
  }
};

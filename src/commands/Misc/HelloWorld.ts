/*
 * File: HelloWorld.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 2:40:10 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 2:40:10 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import { Message } from "discord.js";
import Command from "../../core/Command";
import Rice from "../../Rice";
module.exports = class extends Command {
  constructor() {
    super({
      name: "true",
      enable: false,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(msg: Message, [..._args], _client: Rice): Promise<void> {
    msg.channel.send(`Hello World ${_args.map((c) => c)}`);
  }
};

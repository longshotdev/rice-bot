import Command from "../../core/Command";
import { Message } from "discord.js";

/*
 * File: config.ts
 * Project: ricebot
 * File Created: Tuesday, 21st April 2020 6:16:42 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 21st April 2020 6:16:42 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
module.exports = class extends Command {
  constructor() {
    super({
      name: "config",
      enable: true,
      aliases: [""],
      cooldown: 0,
      permLevel: 6,
      runIn: ["text"],
      usage: "<set|get|reset|list|remove> [key:string] [value:string]",
      usageDelimiter: " ",
    });
  }
  async run(msg: Message, [{ ...required }]): Promise<void> {
    msg.channel.send("im alive");
    console.log(required);
  }
};

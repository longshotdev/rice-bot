import Command from "../../core/Command";
import { Message } from "discord.js";
import GSController from "../../core/api/GuildSettings.controller";
//import { IGuildSettings } from "../../core/api/IGuildSettings";
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
      aliases: ["conf", "cfg"],
      cooldown: 0,
      permLevel: 6,
      runIn: ["text"],
      usage: "<set|get|reset|list|remove> [key:string] [value:string]",
      usageDelimiter: " ",
    });
  }
  async run(msg: Message, [{ ...args }]): Promise<Message> {
    const { required, key, value } = args;
    GSController.testo(msg.guild!.id).then(() => {
      console.log("did iut");
    });
    if (!key || !value) return msg.channel.send("No Key / Value Input.");

    switch (key) {
      case "prefix":
        // GSController.changeConfig(msg.guild!, required, key, value)
        //   .then((cfg: IGuildSettings) => {
        //     msg.channel.send(`Changed prefix to: ${cfg.config.prefix}`);
        //   })
        //   .catch((e) => {
        //     console.log(e);
        //   });

        break;
      case "xp":
        break;
      case "nsfw":
        break;
      case "joinRole":
        break;
      case "EventJoin":
        break;
      default:
        return msg.channel.send("wtf");
    }
    return msg.channel.send(`${required}-${key}-${value}`);
  }
};

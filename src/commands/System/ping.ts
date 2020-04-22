import Command from "../../core/Command";
import { Message, MessageEmbed } from "discord.js";
import Rice from "../../Rice";

/*
 * File: ping.ts
 * Project: ricebot
 * File Created: Saturday, 18th April 2020 7:15:07 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2020 7:15:07 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
class Ping extends Command {
  constructor() {
    super({
      name: "ping",
      cooldown: 0,
      enable: true,
      permLevel: 0,
      runIn: ["text"],
      usage: "",
      aliases: [],
      description: "Ping pong Ding dong!",
      usageDelimiter: "????",
    });
  }
  async run(message: Message, _args: any, client: Rice): Promise<Message> {
    const msg = await message.channel.send("Ping!");
    // const beforeMessageTS = msg.createdTimestamp;
    const embed = new MessageEmbed();
    embed.setAuthor("Ricer", client.user?.displayAvatarURL());
    embed.setDescription("Ping pong?");
    embed.addField("💎", message.guild?.shardID);
    embed.addField(
      "🚋",
      msg.createdTimestamp - message.createdTimestamp + "ms"
    );
    embed.addField("❤", Math.round(client.ws.ping) + "ms");
    embed.setTimestamp();
    return msg.edit(embed); // HACK: I dont know if this is the corret way of gettingping
  }
}
module.exports = Ping;

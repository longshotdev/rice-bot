import Command from "../../core/Command";
import { Message, MessageEmbed } from "discord.js";
import Rice from "../../Rice";
/*
 * File: invite.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 9:41:28 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 9:41:28 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
class Invite extends Command {
  constructor() {
    super({
      name: "invite",
      cooldown: 0,
      enable: true,
      permLevel: 0,
      runIn: ["text"],
      usage: "",
      aliases: [],
      description: "YES YES YES",
      usageDelimiter: "????",
    });
  }
  async run(message: Message, _args: any, client: Rice): Promise<Message> {
    // TODO: Make this non fucky for end users :)
    const invite = await client.generateInvite(["ADMINISTRATOR"]);
    const embed = new MessageEmbed();
    embed.setAuthor("Rice Worker", client.user?.displayAvatarURL());
    embed.setTimestamp();
    client.user?.displayAvatarURL()
      ? embed.setThumbnail(client.user.displayAvatarURL())
      : null;
    embed.setURL(invite);
    embed.setTitle("Invite me!");
    embed.setDescription(
      `Invite ${client.user?.username}#${client.user?.discriminator} to your server.`
    );
    embed.addField("Permissions Required:", "Administrator");
    return message.channel.send(embed);
  }
}
module.exports = Invite;

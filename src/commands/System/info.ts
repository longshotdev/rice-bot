import Command from "../../core/Command";
import Discord, { Message } from "discord.js";
import RiceEmbed from "../../core/RichEmbed";
import Rice from "../../Rice";
/*
 * File: info.ts
 * Project: ricebot
 * File Created: Tuesday, 21st April 2020 10:57:58 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 21st April 2020 10:57:58 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
module.exports = class extends Command {
  constructor() {
    super({
      name: "info",
      cooldown: 0,
      enable: true,
      permLevel: 0,
      runIn: ["text"],
      usage: "",
      aliases: [],
      description: "Info on the fields.",
      usageDelimiter: "????",
    });
  }
  async run(message: Message, _args: any, client: Rice): Promise<Message> {
    if (!message.guild) return Promise.reject();
    if (!client.user) return Promise.reject();
    const Pages = [
      {
        title: "Rice Market Stats:",
        author: {
          name: client.user?.username,
          iconURL: client.user?.displayAvatarURL(),
        },
        thumbnail: {
          url: client.user?.displayAvatarURL(),
        },
        fields: [
          {
            name: "CPU:",
            value: (process.cpuUsage().user / 1000 / 1000).toFixed(2) + "%",
            inline: true,
          },
          {
            name: "Memory Usage:",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(
              2
            )} MB`,
            inline: true,
          },
          {
            name: "Uptime:",
            value: `${client.uptime}`,
            inline: true,
          },
          {
            name: "Discord JS:",
            value: `v${Discord.version}`,
            inline: true,
          },
          {
            name: "Node.JS:",
            value: `${process.version}`,
            inline: true,
          },
        ],
      },
      {
        title: `${message.guild?.name}'s Stats`,
        author: {
          name: client.user?.username,
          iconURL: message.guild?.iconURL() || client.user?.defaultAvatarURL,
        },
        thumbnail: {
          url: message.guild?.iconURL() || client.user?.defaultAvatarURL,
        },
        fields: [
          {
            name: "Member Count",
            value: `${message.guild?.memberCount}`,
            inline: true,
          },
          {
            name: "Shard ID",
            value: `${message.guild.shardID}`,
            inline: true,
          },
          {
            name: "Join Date",
            value: `${message.guild.joinedAt}`,
            inline: true,
          },
          {
            name: "Created on",
            value: `${message.guild.createdAt}`,
            inline: true,
          },
          {
            name: "Owner",
            value: `${message.guild.owner?.user.username}`,
            inline: true,
          },
        ],
      },
      {
        title: `Rice's Stats`,
        author: {
          name: "Global Stats",
          iconURL: client.user?.displayAvatarURL(),
        },
        thumbnail: {
          url: client.user?.displayAvatarURL(),
        },
        fields: [
          {
            name: "Guild Count",
            value: `${client.guilds.cache.size}`,
            inline: true,
          },
          {
            name: "Member Count",
            value: `${client.users.cache.size}`,
            inline: true,
          },
          {
            name: "Join Date",
            value: `${message.guild.joinedAt}`,
            inline: true,
          },
          {
            name: "Version",
            value: `Pre Alpha Stage`,
            inline: true,
          },
          {
            name: "Contributors",
            value: `AndyIsCool5463`,
            inline: true,
          },
        ],
      },
    ];
    const embed = new RiceEmbed(true, Pages);
    return embed.sendEmbed(message);
  }
};

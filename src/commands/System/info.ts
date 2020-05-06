import Command from "../../core/models/Command";
import Rice from "../../Rice";
import { Message } from "discord.js";
import PageEmbed from "../../core/tools/PageEmbed";
import Discord from "discord.js";
import Page from "../../core/models/Page";
export default class extends Command {
  constructor() {
    super({
      name: "info",
      enable: true,
      cooldown: 0,
      runIn: ["text"],
      permLevel: 0,
      usage: "",
      description: "bruh",
      aliases: [],
    });
  }
  public async run(client: Rice, message: Message): Promise<Message | void> {
    const embed = new PageEmbed(client, message);
    embed.addPages([
      new Page({
        title: "Rice Market Stats:",
        author: {
          name: client.user?.username,
          iconURL: client.user?.displayAvatarURL(),
        },
        thumbnail: {
          url: client.user!.displayAvatarURL(),
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
      }),
      new Page({
        title: `${message.guild?.name}'s Stats`,
        author: {
          name: client.user?.username,
          iconURL: message.guild?.iconURL() || client.user?.defaultAvatarURL,
        },
        thumbnail: {
          url: message.guild!.iconURL() || client.user!.defaultAvatarURL,
        },
        fields: [
          {
            name: "Member Count",
            value: `${message.guild?.memberCount}`,
            inline: true,
          },
          {
            name: "Shard ID",
            value: `${message.guild!.shardID}`,
            inline: true,
          },
          {
            name: "Join Date",
            value: `${message.guild!.joinedAt}`,
            inline: true,
          },
          {
            name: "Created on",
            value: `${message.guild!.createdAt}`,
            inline: true,
          },
          {
            name: "Owner",
            value: `${message.guild!.owner!.user.username}`,
            inline: true,
          },
        ],
      }),
      new Page({
        title: `Rice's Stats`,
        author: {
          name: "Global Stats",
          iconURL: client.user?.displayAvatarURL(),
        },
        thumbnail: {
          url: client.user!.displayAvatarURL(),
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
            value: `${message.guild!.joinedAt}`,
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
      }),
    ]);
    return embed.sendEmbed();
  }
}

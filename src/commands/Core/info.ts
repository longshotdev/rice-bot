import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import client from "../../core/Rice";
import { Page } from "../../core/models";
import PageEmbed from "../../core/tools/PageEmbed";
import Discord from "discord.js";
export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "info",
            description: "Displays Bot, Server and Global stats.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        const embed = new PageEmbed(client.getInstance(), message);
        embed.addPages([
            new Page({
                title: "Rice Market Stats:",
                author: {
                    name: client.getInstance().user?.username,
                    iconURL: client.getInstance().user?.displayAvatarURL(),
                },
                thumbnail: {
                    url: client.getInstance().user!.displayAvatarURL(),
                },
                fields: [
                    {
                        name: "CPU:",
                        value: (process.cpuUsage().user / 1000 / 1000).toFixed(2) + "%",
                        inline: true,
                    },
                    {
                        name: "Memory Usage:",
                        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(
                            process.memoryUsage().heapTotal /
                            1024 /
                            1024
                        ).toFixed(2)} MB`,
                        inline: true,
                    },
                    {
                        name: "Uptime:",
                        value: `${client.getInstance().uptime}`,
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
                    name: client.getInstance().user?.username,
                    iconURL: message.guild?.iconURL() || client.getInstance().user?.defaultAvatarURL,
                },
                thumbnail: {
                    url: message.guild!.iconURL() || client.getInstance().user!.defaultAvatarURL,
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
                    iconURL: client.getInstance().user?.displayAvatarURL(),
                },
                thumbnail: {
                    url: client.getInstance().user!.displayAvatarURL(),
                },
                fields: [
                    {
                        name: "Guild Count",
                        value: `${client.getInstance().guilds.cache.size}`,
                        inline: true,
                    },
                    {
                        name: "Member Count",
                        value: `${client.getInstance().users.cache.size}`,
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

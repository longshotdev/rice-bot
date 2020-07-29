import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import { Emojis } from "../../util/emojis";
import fetch from "node-fetch";
import shorten from "../../util/shorten";
import Rice from "../../core/Rice";
export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "changelog",
            description: "Ping pong.",
            cooldown: 3,
        });
    }
    public async run(message: Message, args: any): Promise<Message> {
        let msg = await message.channel.send(`${Emojis.GIF_PARROT} Fetching... ${Emojis.GIF_PARROT}`);
        // https://api.github.com/repos/longshotdev/rice-bot/commits
        const data = await fetch(`https://api.github.com/repos/longshotdev/rice-bot/commits?sha=${<string>args[0] || "master"}&per_page=10`, {
            headers: { "User-Agent": "Rice-Bot/V1" },
        });
        let target = await data.json();
        if (!data.ok) {
            return msg.edit(`Branch \`${<string>args[0]}\` not found.`);
        } else {
            const embed = new MessageEmbed()
                .setTitle(`[Rice-Bot:${<string>args[0] || "master"} Latest Commits]`)
                .setColor("#ADD8E6")
                .setURL("https://github.com/longshotdev/rice-bot")
                .setThumbnail(Rice.getInstance().user!.displayAvatarURL())
                .setDescription(
                    target
                        .map((commit: any) => {
                            const author = commit.author === null ? "Rice" : commit.author.login;
                            const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
                            return `${hash} - ${author} - ${shorten(commit.commit.message.split("\n")[0], 45)}`;
                        })
                        .join("\n")
                )
                .setFooter(
                    `Code last updated ${new Date(target[0].commit.author.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}`
                );
            await msg.delete();
            return message.channel.send(embed);
        }
    }
}

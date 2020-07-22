import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import { Emojis } from "../../util/emojis";
import Rice from "../../core/Rice";
import msToTime from "../../util/msToTime";
export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "ping",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        let msg = await message.channel.send(`${Emojis.GIF_PARROT} Pinging... ${Emojis.GIF_PARROT}`);
        msg.edit({
            embed: {
                title: "📡 Ping",
                description: [
                    "**Server**: `" + (msg.createdAt.getMilliseconds() - message.createdAt.getMilliseconds()) + "ms`",
                    "**API**: `" + Math.round(Rice.getInstance().ws.ping) + "ms`",
                    "**Uptime**: `" + msToTime(Rice.getInstance().uptime!) + "`",
                ].join("\n"),
                color: "#FFF",
                footer: {
                    text: `Requested by ${message.author.tag}`,
                    icon_url: message.author.displayAvatarURL(),
                },
                timestamp: new Date(),
            },
        });
        return msg;
    }
}

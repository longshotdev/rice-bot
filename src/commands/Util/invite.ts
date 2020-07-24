import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import Rice from "../../core/Rice";
import { Emojis } from "../../util/emojis";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "invite",
            description: "Provides a bot invite.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        let loadingMsg = await message.channel.send(`${Emojis.GIF_FORTNITE} Generating Invite...`);
        let inviteLink = await Rice.getInstance().generateInvite(["SEND_MESSAGES", "MANAGE_GUILD", "ADMINISTRATOR"]);
        const embed = new MessageEmbed()
            .setThumbnail(Rice.getInstance().user!.displayAvatarURL())
            .setAuthor(Rice.getInstance().user!.username, Rice.getInstance().user!.displayAvatarURL())
            .setTitle(`${Rice.getInstance().user!.tag}`)
            .addField(`Invite URL:`, `[Here](${inviteLink})`)
            .setColor("#" + Math.random().toString(16).slice(2, 8).toUpperCase())
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp();
        //     message.channel.send(`Heres your code! **${i.url}** \n`)
        await loadingMsg.delete();
        return message.channel.send(embed);
    }
}

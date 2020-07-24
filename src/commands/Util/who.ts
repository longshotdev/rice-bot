import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "who",
            description: "Provides info on who you mention.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        const member = message.mentions!.members!.first() || message.member;
        const embed = new MessageEmbed()
            .setAuthor(member!.user.username, member?.user.displayAvatarURL())
            .setColor(member!.displayHexColor)
            .setThumbnail(member!.user.displayAvatarURL())
            .addField("Username", member?.user.tag)
            .addField("Nickname", member!.nickname ? member!.nickname : "No nickname")
            .addField("Snowflake", member!.id)
            .addField("Account Age", member!.user.createdAt)
            .addField("Joined Guild At", member!.joinedAt)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp();
        return message.channel.send(embed);
    }
}

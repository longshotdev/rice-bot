import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import { Emojis } from "../../util/emojis";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "icon",
            description: "Displays the server icon.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        let msg = await message.channel.send(`${Emojis.GIF_CHIKA_DANCE} Generating icon...`);
        if (!message.guild?.iconURL()) return msg.edit("No icon found!");

        let iconembed = new MessageEmbed()
            .setColor("00ff00")
            .setFooter("Searched by " + message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
            .setImage(message.guild!.iconURL()!)
            .setTitle("Icon")
            .setDescription("[Icon URL link](" + message.guild!.iconURL() + ")");
        await msg.delete();
        return message.channel.send(iconembed);
    }
}

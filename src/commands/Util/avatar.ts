import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "avatar",
            description: "Displays the avatar of your or someone's avatar.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        const member = message.mentions!.members!.first() || message.member;
        return message.reply(`Here you go. ${member!.user.displayAvatarURL({ size: 4096 })}`);
    }
}

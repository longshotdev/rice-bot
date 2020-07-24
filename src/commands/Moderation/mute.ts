import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import { Emojis } from "../../util/emojis";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "mute",
            description: "Mute a user.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        return message.channel.send(`MODERATION NOT IMPLEMENTED. (have a birb! ${Emojis.GIF_PARROT})`);
    }
}

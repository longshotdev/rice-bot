import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import { Emojis } from "../../util/emojis";
export default class extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "eval",
            description: "Evaluates Javascript.",
            cooldown: 0,
        });
    }
    public async run(message: Message): Promise<Message> {
        return message.channel.send(`${Emojis.GIF_PARROT} Command not implemented. ${Emojis.GIF_PARROT}`);
    }
}

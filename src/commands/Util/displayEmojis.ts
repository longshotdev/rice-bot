import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import { Emojis } from "../../util/emojis";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "emojis",
            description: "All the Bot's Emojis.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        let text = "";
        Object.values(Emojis).forEach((emoji) => {
            text += emoji;
        });
        return message.channel.send(text);
    }
}

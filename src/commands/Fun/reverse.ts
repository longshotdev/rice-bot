import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "reverse",
            description: "Reverses the text you send.",
            cooldown: 3,
        });
    }
    public async run(message: Message, args: any[]): Promise<Message> {
        if (!args) return message.channel.send("Send some text fag.");
        return message.channel.send(args.join(" ").split("").reverse().join(""));
    }
}

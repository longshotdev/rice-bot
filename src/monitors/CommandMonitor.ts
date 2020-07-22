import { Monitor } from "../core/models/Monitor";
import { MonitorStore } from "../core/stores/MonitorStore";
import { Message } from "discord.js";
import Rice from "../core/Rice";
export default class CommandMonitor extends Monitor implements Monitor {
    private cooldowns = new Set();
    constructor(store: MonitorStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "Command",
            ignoreBots: true,
            ignoreSelf: true,
        });
    }
    public async run(message: Message): Promise<Message | void> {
        let prefix = "^";
        if (message.mentions.has(Rice.getInstance().user!)) {
            return message.reply(`My prefix is \`${prefix}\``);
        }
        const args = message.content.split(" ").slice(1);
        if (!message.content.startsWith(prefix)) return; // this is to ensure that if the user did not use prefix, they wont get fucked dong
        const command = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandRunnable = Rice.getInstance().commandStore.get(command[0].toLowerCase());
        if (!commandRunnable) return;
        if (commandRunnable.restricted && message.author.id != "201825529333153792") return; // TODO: Fix this shit later.
        if (commandRunnable.cooldown) {
            if (this.cooldowns.has(message.author.id)) return message.channel.send("You are on cooldown.");
            commandRunnable.run!(message, args!);
            this.cooldowns.add(message.author.id);
            setTimeout(() => this.cooldowns.delete(message.author.id), commandRunnable.cooldown * 1000);
        } else commandRunnable.run!(message, args!);
    }
}

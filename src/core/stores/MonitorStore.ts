import { Store, FragConstructor } from "../models/Store";
import { Message } from "discord.js";
import Rice from "../Rice";
import { Monitor } from "../models/Monitor";

export class MonitorStore extends Store<Monitor> {
    constructor(dir: string) {
        super("Monitors", Monitor as FragConstructor<Monitor>, dir);
    }
    public runMonitors(msg: Message) {
        for (const monit of super.values()) {
            if (monit.enabled && !(monit.ignoreBots && msg.author.bot) && !(monit.ignoreSelf && Rice.getInstance().user === msg.author)) {
                monit.run!(msg).catch((e: Error) => {
                    msg.channel.send(`There was an error executing your command: \n\`\`\`${e.message}\`\`\``);
                });
            }
        }
    }
}

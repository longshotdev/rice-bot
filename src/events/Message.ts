import { Event } from "../core/models/discord/Event";
import { EventStore } from "../core/stores";
import { Message } from "discord.js";
import Rice from "../core/Rice";
export default class MessageEvent extends Event implements Event {
    constructor(store: EventStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "message",
        });
    }
    public async run(message: Message): Promise<void> {
        Rice.getInstance().monitorStore.runMonitors(message);
    }
}

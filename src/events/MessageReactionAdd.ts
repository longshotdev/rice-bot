import { Event } from "../core/models/discord/Event";
import { EventStore } from "../core/stores";
import Rice from "../core/Rice";
export default class MessageReactionAddEvent extends Event implements Event {
    constructor(store: EventStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "messageReactionAdd",
        });
    }
    public async run(...any: any): Promise<void> {
        Rice.getInstance().monitorStore.runMonitor("messageReactionAdd", any);
    }
}

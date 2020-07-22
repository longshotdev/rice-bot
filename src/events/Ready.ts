import { Event } from "../core/models/discord/Event";
import { EventStore } from "../core/stores";
export default class Ready extends Event implements Event {
    constructor(store: EventStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "ready",
        });
    }
    public async run(): Promise<void> {
        console.log("ready k.");
    }
}

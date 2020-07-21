import { Client } from "discord.js";
import { CommandStore, EventStore } from "./stores";

class Rice extends Client {
    private static instance: Rice;
    public commandStore: CommandStore = new CommandStore("./src/commands");
    public eventStore: EventStore = new EventStore("./src/events");

    private constructor() {
        super({});
        console.log("ok");
    }
    static getInstance(): Rice {
        if (!Rice.instance) {
            Rice.instance = new Rice();
        }

        return Rice.instance;
    }
}
export interface RiceOptions {
    commandDir: string;
    eventDir: string;
}
export default Rice;

import { Client } from "discord.js";
import { CommandStore, EventStore, MonitorStore } from "./stores";
import Monk, { IMonkManager } from "monk";
class Rice extends Client {
    private static instance: Rice;
    public commandStore: CommandStore = new CommandStore("./src/commands");
    public eventStore: EventStore = new EventStore("./src/events");
    public monitorStore: MonitorStore = new MonitorStore("./src/monitors");
    // @ts-ignore
    public db: IMonkManager = null;

    private constructor() {
        super({});
    }
    static getInstance(): Rice {
        if (!Rice.instance) {
            Rice.instance = new Rice();
            (async () => {
                Rice.getInstance().db = Monk(process.env.MONGO_URL!);
            })();
        }
        return Rice.instance;
    }
}
export interface RiceOptions {
    commandDir: string;
    eventDir: string;
}
export default Rice;

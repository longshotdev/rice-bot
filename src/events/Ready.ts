import { Event } from "../core/models/discord/Event";
import { EventStore } from "../core/stores";
import chalk from "chalk";
import Rice from "../core/Rice";
export default class Ready extends Event implements Event {
    constructor(store: EventStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "ready",
        });
    }
    public async run(): Promise<void> {
        console.log(chalk.greenBright(`Running ${Rice.getInstance().user!.tag} in ${Rice.getInstance().guilds.cache.size} servers.`));
        await Rice.getInstance().user!.setPresence({
            activity: {
                name: "pokemain",
                type: "WATCHING",
                url: "https://www.youtube.com/watch?v=8ybW48rKBME",
            },
            status: "dnd",
        });
    }
}

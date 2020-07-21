import { Store, FragConstructor } from "../models/Store";
import { Command } from "../models/discord/Command";

export class CommandStore extends Store<Command> {
    constructor(dir: string) {
        super("Commands", Command as FragConstructor<Command>, dir);
        (async () => {
            await super.loadAll();
            super.forEach((c) => {
                console.log(c.file.join(""));
            });
        })();
    }
}

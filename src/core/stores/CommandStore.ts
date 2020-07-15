import { Store, FragConstructor } from "../models/Store";
import { Command } from "../models/discord/Command";
import { join } from "path";

export class CommandStore extends Store<Command> {
    constructor(dir: string) {
        super("Commands", Command as FragConstructor<Command>, dir);
        (async () => {
            await super.loadAll();
            super.forEach((c) => {
                console.log(join(...c.file));
            });
        })();
    }
}

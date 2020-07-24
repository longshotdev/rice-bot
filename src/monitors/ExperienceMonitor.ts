import { Monitor } from "../core/models/Monitor";
import { MonitorStore } from "../core/stores/MonitorStore";
import { Message } from "discord.js";
export default class ExperienceMonitor extends Monitor implements Monitor {
    constructor(store: MonitorStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "Experience",
            ignoreBots: true,
            ignoreSelf: true,
        });
    }
    public async run(): Promise<Message | void> {
        console.log("Experience MONITOR NOT IMPLEMENTED.");
        return;
    }
}

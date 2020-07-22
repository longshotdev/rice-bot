import Fragment from "./Fragment";
import { MonitorStore } from "../stores";
import { Message } from "discord.js";
export class Monitor extends Fragment implements Monitor {
    public name: string;
    public ignoreBots: boolean;
    public ignoreSelf: boolean;

    public constructor(store: MonitorStore, dir: string, files: readonly string[], options: MonitorOptions = {}) {
        super(store, dir, files, {
            name: options.name,
            enabled: true,
        });
        this.name = options.name as string;
        this.ignoreBots = options.ignoreBots as boolean;
        this.ignoreSelf = options.ignoreSelf as boolean;
    }
}
export interface MonitorOptions {
    name?: string;
    ignoreBots?: boolean;
    ignoreSelf?: boolean;
}
export interface Monitor {
    run?(message: Message): Promise<void | Message>;
}

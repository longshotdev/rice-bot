import { Fragment } from "./Fragment";
import { MonitorStore } from "../stores";
import { Message } from "discord.js";
export class Monitor extends Fragment implements Monitor {
    public name: string;
    public ignoreBots: boolean;
    public ignoreSelf: boolean;
    public listensFor: Array<string>;

    public constructor(store: MonitorStore, dir: string, files: readonly string[], options: MonitorOptions = {}) {
        super(store, dir, files, {
            name: options.name,
            enabled: true,
        });
        this.name = options.name as string;
        this.ignoreBots = options.ignoreBots as boolean;
        this.ignoreSelf = options.ignoreSelf as boolean;
        this.listensFor = options.listensFor as Array<string>;
    }
}
export interface MonitorOptions {
    name?: string;
    ignoreBots?: boolean;
    ignoreSelf?: boolean;
    listensFor?: Array<string>;
}
export interface Monitor {
    //    run?(message: Message): Promise<void | Message>;
    run?(...args: any): Promise<void | Message>;
}

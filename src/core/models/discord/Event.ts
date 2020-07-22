import Fragment from "../Fragment";
import Rice from "../../Rice";
import { EventStore } from "../../stores";
export class Event extends Fragment implements Event {
    public name: string;

    public constructor(store: EventStore, dir: string, files: readonly string[], options: EventOptions = {}) {
        super(store, dir, files, {
            name: options.name,
            enabled: true,
        });
        this.name = options.name as string;
        Rice.getInstance().addListener(this.name, this.run!);
    }
}
export interface EventOptions {
    name?: string;
}
export interface Event {
    run?([...params]: any): Promise<void>;
}

import { Store, FragConstructor } from "../models/Store";
import { Event } from "../models/discord/Event";

export class EventStore extends Store<Event> {
    constructor(dir: string) {
        super("Events", Event as FragConstructor<Event>, dir);
    }
}

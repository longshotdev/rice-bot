/*
 * File: EventStore.ts
 * Project: ricebot
 * File Created: Thursday, 23rd April 2020 4:44:10 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 23rd April 2020 4:44:10 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import Store from "./Store";
import Event from "./Event";
import Rice from "../Rice";
import { Collection } from "discord.js";

class EventStore extends Store<string, Event> {
  private client: Rice;
  constructor(client: Rice) {
    super();
    this.client = client;
  }
  clear() {
    for (const event of this.store.keys()) this.delete(event);
  }
  delete(event: string): Collection<string, Event> {
    const ev = this.get(event);

    if (!ev)
      throw new Error(
        `Couldn't find event: ${event} in Event Store. Failed Deletion.`
      );
    this.client.removeAllListeners(ev.name);
    super.delete(ev.name);
    return this.store;
  }
  register(event: Event) {
    this.set(event.name, event);
  }
}
export default EventStore;

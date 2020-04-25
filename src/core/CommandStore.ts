import { Collection } from "discord.js";
import Command from "./Command";
import Store from "./Store";

/*
 * File: CommandStore.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 4:05:07 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 4:05:08 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

// Simple Key Value Store
class CommandStore extends Store<string, Command> {
  public store: Collection<string, Command> = super.getStore;
  public storeAlias = new Collection<string, Command>();

  constructor() {
    super();
  }

  public setAlias(key: string, command: Command): Collection<string, Command> {
    this.storeAlias.set(key, command);
    return this.storeAlias;
  }

  public deleteAlias(key: string): Collection<string, Command> {
    this.storeAlias.delete(key);
    return this.storeAlias;
  }
}
export default CommandStore;

import { Collection } from "discord.js";
import Command from "./Command";

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
class CommandStore {
  public static store = new Collection<string, Command>();
  public static storeAlias = new Collection<string, Command>();

  public static set(
    key: string,
    command: Command
  ): Collection<string, Command> {
    this.store.set(key, command);
    return this.store;
  }

  public static delete(key: string): Collection<string, Command> {
    this.store.delete(key);
    return this.store;
  }

  public static setAlias(
    key: string,
    command: Command
  ): Collection<string, Command> {
    this.storeAlias.set(key, command);
    return this.store;
  }

  public static deleteAlias(key: string): Collection<string, Command> {
    this.storeAlias.delete(key);
    return this.store;
  }
}
export default CommandStore;

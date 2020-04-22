import { Collection, Snowflake } from "discord.js";
import Command from "./Command";

/*
 * File: CooldownStore.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 6:02:17 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 6:02:18 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
interface ICooldown {
  commands: Collection<Command, number>;
}
export default class extends Collection<Snowflake, ICooldown> {
  public static store = new Collection<Snowflake, ICooldown>();

  public static addUser(user: Snowflake, command: Command): void {
    let temp: Collection<Command, number> = new Collection<Command, number>();
    temp.set(command, command.cooldown);
    this.store.set(user, { commands: temp });
  }
  public static checkUser(user: Snowflake): boolean {
    return this.store.has(user);
  }
  public static delete(key: string): Collection<string, ICooldown> {
    this.store.delete(key);
    return this.store;
  }
}

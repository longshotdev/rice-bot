import Store from "./Store";
import { Collection, Snowflake } from "discord.js";
import Queue from "./IQueue";

/*
 * File: MusicStore.ts
 * Project: ricebot
 * File Created: Sunday, 26th April 2020 4:28:31 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Sunday, 26th April 2020 4:28:31 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
class MusicStore extends Store<Snowflake, Queue> {
  public store: Collection<Snowflake, Queue> = super.getStore;

  constructor() {
    super();
  }
}
export default MusicStore;

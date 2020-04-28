/*
 * File: InhibitorStore.ts
 * Project: ricebot
 * File Created: Tuesday, 28th April 2020 3:49:56 pm
 * Author: AndyIsCool5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 28th April 2020 3:49:56 pm
 * Modified By: AndyIsCool5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import Store from "./Store";
import Inhibitor from "./Inhibitor";
import { Collection } from "discord.js";

export default class InhibitorStore extends Store<string, Inhibitor> {
  public store: Collection<string, Inhibitor> = super.getStore;
  constructor() {
    super();
  }
}

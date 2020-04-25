/*
 * File: message.ts
 * Project: ricebot
 * File Created: Friday, 24th April 2020 3:03:09 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Friday, 24th April 2020 3:03:10 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import Rice from "../Rice";
import Event from "../core/Event";

module.exports = class extends Event {
  constructor() {
    super("message", true);
  }
  public async run(client: Rice, [msg, ..._args]: any): Promise<void> {
    client.MonitorStore.run(msg);
    return;
  }
};

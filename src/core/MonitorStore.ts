/*
 * File: MonitorStore.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 3:24:05 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 3:24:05 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import Monitor from "./Monitor";
import Store from "./Store";
import { Message } from "discord.js";
/**
 * This class handles all the monitors which are functions that only execute on `Discord.Client#onMessage`
 */
class MonitorStore extends Store<string, Monitor> {
  protected client: any;

  constructor(client: any) {
    // TODO: Change type to Rice Client
    super();
    this.client = client;
  }
  run(msg: Message) {
    for (const monit of super.getStore.values()) {
      if (
        monit.enabled &&
        !(monit.ignoreBots && msg.author.bot) &&
        !(monit.ignoreSelf && this.client.user === msg.author) &&
        !(monit.ignoreOthers && this.client.user !== msg.author)
      ) {
        monit.run(msg, this.client).catch((Exception: Error) => {
          msg.channel.send(
            `There was an error executing your command. \n \`\`\`${Exception.message}\`\`\``
          );
        });
      }
    }
  }
  public register(monitor: Monitor): void {
    const exists = this.exist(monitor.name);

    if (exists) this.delete(monitor.name);
    else super.set(monitor.name, monitor);
  }
}
export default MonitorStore;

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

/**
 * This class handles all the monitors and registers all events/monitors
 *
 */
import Discord, { Guild } from "discord.js";
import Monitor from "./Monitor";
import GuildJoinMonitor from "../Monitors/GuildJoinMonitor";

class MonitorStore extends Discord.Collection<string, Monitor> {
  protected client: any;

  constructor(client: any) {
    // TODO: Change type to Rice Client
    super();
    this.client = client;
  }
  run(msg: any) {
    for (const monit of this.values()) {
      if (
        monit.enabled &&
        !(monit.ignoreBots && msg.author.bot) &&
        !(monit.ignoreSelf && this.client.user === msg.author) &&
        !(monit.ignoreOthers && this.client.user !== msg.author)
      ) {
        monit.run(msg, this.client);
      }
    }
  }
  runGuild(guild: Guild) {
    new GuildJoinMonitor().run(guild, this.client);
  }
  public register(monitor: Monitor): void {
    const exists = this.get(monitor.name);

    if (exists) this.delete(monitor.name);
    else super.set(monitor.name, monitor);
  }
}
export default MonitorStore;

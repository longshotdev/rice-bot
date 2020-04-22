import IMonitorOptions from "./IMonitorOptions";
import { Message } from "discord.js";
import Rice from "../Rice";
/*
 * File: Monitor.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 3:29:59 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 3:29:59 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
class Monitor {
  public name: string;
  public enabled: boolean;
  public ignoreBots: boolean;
  public ignoreOthers: boolean;
  public ignoreSelf: boolean;
  constructor({
    name,
    enabled,
    ignoreBots,
    ignoreOthers,
    ignoreSelf,
  }: IMonitorOptions) {
    this.name = name;
    this.enabled = enabled;
    this.ignoreBots = ignoreBots;
    this.ignoreOthers = ignoreOthers;
    this.ignoreSelf = ignoreSelf;
  }
  public run(_msg: Message, _client: Rice): void {
    return;
  }
}
export default Monitor;

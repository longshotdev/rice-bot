import { Snowflake } from "discord.js";

/*
 * File: IQueue.ts
 * Project: ricebot
 * File Created: Sunday, 26th April 2020 4:30:12 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Sunday, 26th April 2020 4:30:12 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
export default interface Queue {
  song: any;
  requestedBy: Snowflake;
  timeRequested: Date;
}

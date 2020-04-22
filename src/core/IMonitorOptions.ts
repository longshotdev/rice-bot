/*
 * File: IMonitorOptions.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 3:36:59 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 3:36:59 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

interface IMonitorOptions {
  name: string;
  enabled: boolean;
  ignoreBots: boolean;
  ignoreOthers: boolean;
  ignoreSelf: boolean;
}
export default IMonitorOptions;

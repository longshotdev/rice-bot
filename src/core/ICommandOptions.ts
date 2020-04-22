/*
 * File: ICommandOptions.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 3:10:22 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 3:10:22 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

/**
 *
 */
interface CommandOptions {
  name: string;
  enable: boolean;
  cooldown: number;
  runIn: string[];
  aliases?: Array<string>;
  permLevel: number;
  description?: string;
  usage: string;
  usageDelimiter?: string;
}

export default CommandOptions;

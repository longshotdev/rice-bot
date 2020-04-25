/*
 * File: config.ts
 * Project: ricebot
 * File Created: Tuesday, 21st April 2020 6:12:02 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Tuesday, 21st April 2020 6:12:02 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.dev`;
}
dotenv.config({ path: path });

export const APP_ID = process.env.APP_ID;
export const LOG_LEVEL = process.env.LOG_LEVEL;

/*
 * File: Logger.js
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 12:07:46 am
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 12:07:46 am
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import moment from "moment";
import chalk from "chalk";
enum levels {
  LOG,
  DEBUG,
  WARN,
  ERROR,
  INFO,
}
export default class {
  public static levels = levels;

  public static log(text: string, type: levels): void {
    process.env.NODE_ENV !== "test"
      ? console.log(
          `${chalk.black.bgYellow(
            `[${moment().format("LTS")}]`
          )} [${this.getType(type)}]: ${text}`
        )
      : null;
  }
  public static getType(type: levels): string {
    switch (type) {
      case levels.DEBUG:
        return "DEBUG";
        break;
      case levels.ERROR:
        return "ERROR";
        break;
      case levels.INFO:
        return "INFO";
        break;
      case levels.LOG:
        return "LOG";
        break;
      case levels.WARN:
        return "WARN";
        break;
    }
  }
}

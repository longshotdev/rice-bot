/*
 * File: Command.ts
 * Project: ricebot
 * File Created: Thursday, 16th April 2020 2:36:41 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Thursday, 16th April 2020 2:36:41 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import CommandOptions from "./ICommandOptions";
import { Message } from "discord.js";
import Rice from "../Rice";
class Command {
  public name: string;
  public enable: boolean;
  public cooldown: number;
  public runIn: string[];
  public aliases: any;
  public permLevel: number;
  public usage: string;
  public description: any;
  public usageDelimiter: any;
  public category: any;
  /**
   * Every command is based off this quan.
   * @param {string} name - Command Name.
   *
   */
  constructor({
    name,
    cooldown,
    enable,
    runIn,
    aliases,
    permLevel,
    usage,
    description,
    usageDelimiter,
  }: CommandOptions) {
    this.name = name;
    this.enable = enable;
    this.cooldown = cooldown;
    this.runIn = runIn;
    this.aliases = aliases;
    this.permLevel = permLevel;
    this.usage = usage;
    this.description = description;
    this.usageDelimiter = usageDelimiter;
  }

  public run(_message: Message, [..._args], _client: Rice): void {}
  get getRunIn() {
    return this.runIn;
  }
}

export default Command;

/*
 * File: index.js
 * Project: ricebot
 * File Created: Sunday, 12th April 2020 9:44:05 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Sunday, 12th April 2020 9:44:05 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */
import { Client } from "discord.js";
//import Enmap from "enmap";
import chalk from "chalk";
import Logger from "./util/Logger";
import Command from "./core/Command";
import MonitorStore from "./core/MonitorStore";
import CommandMonitor from "./Monitors/CommandMonitor";
import CommandStore from "./core/CommandStore";
import mongoose from "mongoose";
const fsn = require("fs-nextra");

class Rice extends Client {
  public MonitorStore: MonitorStore;
  public constructor() {
    super();

    // Enmap
    this.MonitorStore = new MonitorStore(this);
    // Events
    this.on("ready", () => this._eventReady());
    this.on("error", (error) => console.log(error));
    // this.on("raw", (data) => Logger.info(data));
    this.on("message", (msg) => this.MonitorStore.run(msg));
    this.on("guildCreate", (guild) => this.MonitorStore.runGuild(guild));
    this.on("warn", (warn) => console.log(warn));

    mongoose
      .connect(
        "mongodb+srv://admin:uPHvx1Fri6aWu9lz@rice-bot-g0slf.mongodb.net/Discord?retryWrites=true&w=majority",
        { useUnifiedTopology: true, useNewUrlParser: true }
      )
      .then(
        () => {
          Logger.log("Logged into Mongo!", Logger.levels.INFO);
        },
        (err) => {
          throw err;
        }
      );
    // Setup Commands
    // This is done initally and will be cached into ram
    // Process: Read ./commands -> Read Each Folder -> Read Each Command File
    // TODO: Make this a param
    this._registerCommands();
    this._registerMonitors();
  }
  private _eventReady(): void {
    Logger.log(
      `Rice Farming in ${chalk.yellow.bold(this.guilds.cache.size)} servers!`,
      Logger.levels.INFO
    );
    this.user?.setActivity({
      name: `${this.guilds.cache.size} Rice Fields`,
      type: "WATCHING",
    });
  }
  private async _registerCommands(): Promise<void> {
    const categories = (await fsn.readdir(`${__dirname}/commands`)).filter(
      (folderName: string) => !(folderName.indexOf(".") !== -1)
    );

    const bruh = categories.map(async (category: string) => {
      const commands = await fsn.readdir(`${__dirname}/commands/${category}`);
      commands.map(async (cmd: string) => {
        const command: Command = new (require(`${__dirname}/commands/${category}/${cmd}`))();
        CommandStore.set(
          command.name.toLowerCase(),
          Object.defineProperty(command, "category", {
            value: category,
            writable: false,
          })
        );
        command.aliases.forEach((alias: string) => {
          CommandStore.setAlias(alias.toLowerCase(), command);
        });
      });
    });
    Promise.all(bruh).then(() => {
      Logger.log(
        `Loaded ${chalk.green.bold(CommandStore.store.size)} commands.`,
        Logger.levels.INFO
      );
    });
  }
  private _registerMonitors() {
    this.MonitorStore.register(new CommandMonitor());
    Logger.log(
      `Loaded ${chalk.green.bold(this.MonitorStore.size)} monitors.`,
      Logger.levels.INFO
    );
  }
  public login(token: string): Promise<string> {
    return super.login(token);
  }
}
export default Rice;
// process.on("uncaughtException", (error?: Error) => {
//   const errorMsg = error.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
//   console.log("Uncaught Exception: " + errorMsg);
//   console.log(error);
//   process.exit(1);
// });

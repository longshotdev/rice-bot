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
import chalk from "chalk";
import Logger from "./util/Logger";
import Command from "./core/Command";
import MonitorStore from "./core/MonitorStore";
import CommandMonitor from "./Monitors/CommandMonitor";
import CommandStore from "./core/CommandStore";
import mongoose from "mongoose";
import EventStore from "./core/EventStore";
import * as fsn from "fs-nextra";
import Event from "./core/Event";
import MusicStore from "./core/MusicStore";
import InhibitorStore from "./core/InhibitorStore";
/**
 * My Ideas Upcoming After #3 Commit.
 *
 * Fuck all the methods in this class.
 * just do everything in the constructor.
 *
 *
 */
class Rice extends Client {
  public MonitorStore: MonitorStore = new MonitorStore(this);
  public CommandStore: CommandStore = new CommandStore();
  public EventStore: EventStore = new EventStore(this);
  public MusicStore: MusicStore = new MusicStore();
  public InhibitorStore: InhibitorStore = new InhibitorStore();

  public constructor() {
    super();
    // Enmap
    // Events
    this.on("ready", () =>
      this.EventStore.getStore.get("ready")!.run(this, [])
    );
    this.on("error", (error) => console.log(error));
    // this.on("raw", (data) => Logger.info(data));
    this.on("message", (msg) =>
      this.EventStore.getStore.get("message")!.run(this, [msg])
    );
    this.on("guildCreate", (guild) =>
      this.EventStore.get("guildCreate")!.run(this, [guild])
    );
    this.on("guildDelete", (guild) =>
      this.EventStore.get("guildDelete")!.run(this, [guild])
    );
    this.on("guildMemberAdd", (guildMember) =>
      this.EventStore.get("guildMemberAdd")!.run(this, [guildMember])
    );
    this.on("warn", (warn) => console.log(warn));

    // Setup Commands
    // This is done initally and will be cached into ram
    // Process: Read ./commands -> Read Each Folder -> Read Each Command File
    // TODO: Make this a param
  }
  public async run(): Promise<void> {
    await this.registerEvents();
    await this.registerCommands();
    await this.registerMonitors();
    await this.connectToMongo();
  }
  public async connectToMongo(): Promise<void> {
    mongoose
      .connect(<string>process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(
        () => {
          Logger.log("Logged into Mongo!", Logger.levels.INFO);
        },
        (err: any) => {
          throw err;
        }
      );
  }
  public async registerEvents(): Promise<void> {
    const events = await fsn.readdir(`${__dirname}/events`);
    events.forEach(async (event) => {
      const evt: Event = new (require(`${__dirname}/events/${event}`))();
      this.EventStore.register(evt);
    });

    Logger.log(
      `Loaded ${chalk.green.bold(events.length)} events.`,
      Logger.levels.INFO
    );
  }
  public async registerCommands(): Promise<void> {
    const categories = (await fsn.readdir(`${__dirname}/commands`)).filter(
      (folderName: string) => !(folderName.indexOf(".") !== -1)
    );

    const bruh = categories.map(async (category: string) => {
      const commands = await fsn.readdir(`${__dirname}/commands/${category}`);
      commands.map(async (cmd: string) => {
        const command: Command = new (require(`${__dirname}/commands/${category}/${cmd}`))();
        this.CommandStore.set(
          command.name.toLowerCase(),
          Object.defineProperty(command, "category", {
            value: category,
            writable: false,
          })
        );
        command.aliases.forEach((alias: string) => {
          this.CommandStore.setAlias(alias.toLowerCase(), command);
        });
      });
    });
    Promise.all(bruh).then(() => {
      Logger.log(
        `Loaded ${chalk.green.bold(this.CommandStore.size)} commands.`,
        Logger.levels.INFO
      );
    });
  }
  public async registerMonitors(): Promise<void> {
    this.MonitorStore.register(new CommandMonitor());
    Logger.log(
      `Loaded ${chalk.green.bold(this.MonitorStore.size)} monitors.`,
      Logger.levels.INFO
    );
    return;
  }
  public login(token: string): Promise<string> {
    return super.login(token);
  }
}
export default Rice;
process.on("uncaughtException", (error?: Error) => {
  const errorMsg = error!.stack!.replace(
    new RegExp(`${__dirname}/`, "g"),
    "./"
  );
  console.log("Uncaught Exception: " + errorMsg);
  console.log(error);
  process.exit(1);
});

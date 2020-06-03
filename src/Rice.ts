import { Client, ClientOptions } from "discord.js";
import EventRegistry from "./core/registry/EventRegistry";
import CommandRegistry from "./core/registry/CommandRegistry";
import MonitorRegistry from "./core/registry/MonitorRegistry";
import mongoose from "mongoose";
import Logger from "./util/Logger";
const yapi = require("simple-youtube-api");

class Rice extends Client {
  private Alogger: Logger = new Logger();
  public eventRegistry: EventRegistry = new EventRegistry(this);
  public commandRegistry: CommandRegistry = new CommandRegistry();
  public monitorRegistry: MonitorRegistry = new MonitorRegistry(this);
  private youtube: any = new yapi(process.env.YOUTUBE_KEY);
  constructor(clientOptions?: ClientOptions) {
    super(clientOptions);
    mongoose.connect(<string>process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
  get youtubeSearch() {
    return this.youtube;
  }
  get logger(): Logger {
    return this.Alogger;
  }
  static get client() {
    return this;
  }
}

export default Rice;

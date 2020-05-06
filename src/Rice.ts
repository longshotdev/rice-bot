import { Client, ClientOptions } from "discord.js";
import EventRegistry from "./core/registry/EventRegistry";
import CommandRegistry from "./core/registry/CommandRegistry";
import MonitorRegistry from "./core/registry/MonitorRegistry";
import mongoose from "mongoose";
import ALogger from "./util/Logger";

class Rice extends Client {
  public logger: ALogger = new ALogger();
  public eventRegistry: EventRegistry = new EventRegistry(this);
  public commandRegistry: CommandRegistry = new CommandRegistry();
  public monitorRegistry: MonitorRegistry = new MonitorRegistry(this);
  constructor(clientOptions?: ClientOptions) {
    super(clientOptions);
    mongoose
      .connect(<string>process.env.MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(
        () => {
          this.logger.log("Logged into Mongo!", this.logger.levels.INFO);
        },
        (err: any) => {
          throw err;
        }
      );
  }
  get getLogger() {
    return this.logger;
  }
  static get client() {
    return this;
  }
}

export default Rice;

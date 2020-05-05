import { Client, ClientOptions } from "discord.js";
import EventRegistry from "./core/Registry/EventRegistry";
import CommandRegistry from "./core/Registry/CommandRegistry";
import MonitorRegistry from "./core/Registry/MonitorRegistry";
import mongoose from "mongoose";
class Rice extends Client {
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
          console.log("Logged into Mongo!");
        },
        (err: any) => {
          throw err;
        }
      );
  }
  static get client() {
    return this;
  }
}

export default Rice;

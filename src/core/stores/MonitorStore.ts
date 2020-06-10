import Store from "../models/Store";
import Rice from "../../Rice";
import Monitor from "../models/Monitor";
import { Message } from "discord.js";

class MonitorStore extends Store<String, Monitor> {
  protected client: Rice;
  constructor(client: Rice) {
    super();
    this.client = client;
  }
  run(msg: Message) {
    for (const monit of super.getStore.values()) {
      if (
        monit.enabled &&
        !(monit.ignoreBots && msg.author.bot) &&
        !(monit.ignoreSelf && this.client.user === msg.author)
      ) {
        monit.run(msg, this.client).catch((Exception: Error) => {
          msg.channel.send(
            `There was an error executing your command. \n \`\`\`${Exception.message}\`\`\``
          );
        });
      }
    }
  }
  public disableMonitor(name: string) {
    let monitor = super.getStore.find((monitor) => monitor.name === name);
    if (!monitor)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    monitor.enabled = false;
  }
  public enableMonitor(name: string) {
    let monitor = super.getStore.find((monitor) => monitor.name === name);
    if (!monitor)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    monitor.enabled = true;
  }
  public toggleMonitor(name: string) {
    let monitor = super.getStore.find((monitor) => monitor.name === name);
    if (!monitor)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    monitor.enabled = !monitor.enabled;
  }
}

export default MonitorStore;

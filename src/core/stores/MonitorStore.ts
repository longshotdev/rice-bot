import Store from "../models/Store";
import Rice from "../../Rice";
import Monitor from "../models/Monitor";
import { Message } from "discord.js";
import GuildSettingController from "../../api/controller/GuildSettingController";
import { Message as DiscordMessage } from "discord.js";
class MonitorStore extends Store<String, Monitor> {
  protected client: Rice;
  constructor(client: Rice) {
    super();
    this.client = client;
  }
  async run(msg: Message) {
    let guild = await GuildSettingController.getGuild(
      (<DiscordMessage>msg).guild!
    );

    for (const monit of super.getStore.values()) {
      if (
        monit.enabled &&
        !(monit.ignoreBots && msg.author.bot) &&
        !(monit.ignoreSelf && this.client.user === msg.author) &&
        !(guild.config.disabledModulesServerWide === "all") &&
        !guild.config.disabledModulesServerWide.includes(monit.name) &&
        monit.emitsOnEvent.includes("message")
      ) {
        monit.run(msg, this.client).catch((Exception: Error) => {
          console.log(Exception);
          msg.channel.send(
            `There was an error executing monitor. \n \`\`\`${Exception.message}\`\`\``
          );
        });
      }
    }
  }
  public async runMonitor(name: string, ...args: any) {
    for (const monit of super.getStore.values()) {
      if (monit.enabled && monit.emitsOnEvent.includes(name)) {
        monit.run(...args).catch((Exception: Error) => {
          console.log(Exception);
          throw new Error(
            `There was an error executing monitor. \n \`\`\`${Exception.message}\`\`\``
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

import Event from "../core/models/Event";
import Rice from "../Rice";
import { Message as DiscordMessage } from "discord.js";
import MonitorStore from "../core/stores/MonitorStore";
class Message extends Event {
  constructor() {
    super("message");
  }
  public run(client: Rice, [msg, ..._args]: any) {
    let bruh = <MonitorStore>client.monitorRegistry.getMonitorStore;
    bruh.run(<DiscordMessage>msg);
  }
}
export default Message;

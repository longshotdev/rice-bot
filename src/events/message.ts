import Event from "../core/models/Event";
import Rice from "../Rice";
import { Message as DiscordMessage } from "discord.js";
class Message extends Event {
  constructor() {
    super("message");
  }
  public run(client: Rice, [msg, ..._args]: any) {
    client.monitorRegistry.getMonitorStore.run(<DiscordMessage>msg, client);
  }
}
export default Message;

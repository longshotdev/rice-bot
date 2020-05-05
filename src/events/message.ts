import Event from "../core/models/Event";
import Rice from "../Rice";
import { Message as DiscordMessage } from "discord.js";
class Message extends Event {
  constructor() {
    super("message");
  }
  public run(_client: Rice, [msg, ..._args]: any) {
    _client.monitorRegistry.getMonitorStore.run(<DiscordMessage>msg);
  }
}
export default Message;

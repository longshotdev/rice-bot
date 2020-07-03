import Event from "../core/models/Event";
import Rice from "../Rice";
import { Message as DiscordMessage } from "discord.js";
import MonitorStore from "../core/stores/MonitorStore";
import GuildSettingController from "../api/controller/GuildSettingController";
class Message extends Event {
  constructor() {
    super("message");
  }
  public async run(client: Rice, [msg, ..._args]: any) {
    // check if the message will be able to even run in this channel
    await GuildSettingController.getGuild((<DiscordMessage>msg).guild!);
    let bruh = <MonitorStore>client.monitorRegistry.getMonitorStore;
    bruh.run(<DiscordMessage>msg);
  }
}
export default Message;

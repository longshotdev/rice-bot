import Event from "../core/models/Event";
import Rice from "../Rice";
import MonitorStore from "../core/stores/MonitorStore";
class MessageReactionAdd extends Event {
  constructor() {
    super("messageReactionAdd");
  }
  public async run(client: Rice, [messageReaction, user, ..._args]: any) {
    (<MonitorStore>client.monitorRegistry.getMonitorStore).runMonitor(
      "messageReactionAdd",
      messageReaction,
      user
    );
  }
}
export default MessageReactionAdd;

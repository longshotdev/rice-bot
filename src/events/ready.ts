import Event from "../core/models/Event";
import Rice from "../Rice";
class Ready extends Event {
  constructor() {
    super("ready");
  }
  public run(client: Rice) {
    client.logger.log(
      `${client.user!.username}#${client.user?.discriminator} is serving ${
        client.guilds.cache.size
      } fields!`
    );
    client.user!.setPresence({
      status: "idle",
      activity: {
        type: "WATCHING",
        name: `${client.guilds.cache.size} fields.`,
      },
    });
  }
}
export default Ready;

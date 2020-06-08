import Event from "../core/models/Event";
import Rice from "../Rice";
import DCMController from "../api/controller/DCMController";
import { IDCM } from "../api/controller/IDCMController";
import { Document } from "mongoose";
class Ready extends Event {
  constructor() {
    super("ready");
  }
  public async run(client: Rice) {
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
    const messagesNeedCache = await DCMController.getAllMessages();
    messagesNeedCache.forEach(async (dcm: Document) => {
      const castedMessage = <IDCM>(<unknown>dcm);
      /**
       * @summary please. dont use this after sharding.
       * All of the Channels that the client is currently handling,
       * mapped by their IDs - as long as sharding isn't being used,
       * this will be every channel in every guild the bot is a member of.
       * Note that DM channels will not be initially cached, and thus not
       * be present in the Manager without their explicit fetching or use.
       */
      client.channels.fetch(castedMessage.channel).catch((e) => {
        if (e) DCMController.deleteCM(castedMessage.messageid);
      });
    });
  }
}
export default Ready;

import Store from "../models/Store";
import Rice from "../../Rice";
import { Snowflake } from "discord.js";

interface IQueue {
  songName: string;
  songID: string;
  requestedBy: Snowflake;
}
interface IGuildMusic {
  isPlaying: boolean;
  queue: IQueue[];
}
class MusicStore extends Store<Snowflake, IGuildMusic> {
  protected client: Rice;
  constructor(client: Rice) {
    super();
    this.client = client;
  }
  addToQueue(guildID: Snowflake, song: IQueue) {
    super.set(guildID, {
      isPlaying: true,
      queue: [song, ...(super.get(guildID)!.queue || [])],
    });
  }
}

export default MusicStore;

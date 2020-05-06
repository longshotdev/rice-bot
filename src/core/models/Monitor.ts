import IMonitorOptions from "./IMonitorOptions";
import { Message } from "discord.js";
import Rice from "../../Rice";

/**
 * This is similar to Klasa's Monitor.
 * It runs on every message and is useful for perm checking or xp adding etc.
 */
class Monitor {
  public enabled: boolean;
  public ignoreBots: boolean = true;
  public ignoreSelf: boolean = true;
  public ignoreEdits: boolean = true;
  public allowedTypes: string[] = ["DEFAULT"];
  public name: string;

  constructor({
    enabled,
    ignoreBots,
    ignoreEdits,
    ignoreSelf,
    allowedTypes,
    name,
  }: IMonitorOptions) {
    this.name = name;
    this.enabled = enabled;
    if (ignoreBots) this.ignoreBots = ignoreBots;
    if (ignoreEdits) this.ignoreEdits = ignoreEdits;
    if (ignoreSelf) this.ignoreSelf = ignoreSelf;
    if (allowedTypes) this.allowedTypes = allowedTypes;
  }
  public async run(_message: Message, _client: Rice): Promise<Message | void> {}
  shouldRun(message: Message, client: Rice) {
    return (
      this.enabled &&
      this.allowedTypes.includes(message.type) &&
      !(this.ignoreBots && message.author.bot) &&
      !(this.ignoreSelf && client.user === message.author) &&
      !(this.ignoreEdits && message.edits.length)
    );
  }
}

export default Monitor;

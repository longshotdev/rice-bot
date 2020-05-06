import ICommandOptions from "./ICommandOptions";
import { Message } from "discord.js";
import Rice from "../../Rice";

class Command {
  public name: String;
  public enable: boolean;
  public cooldown: number;
  public runIn: string[];
  public aliases: string[] | string;
  public permLevel: number;
  public usage: string;
  public description: string;
  public category: string = "null";
  constructor({
    name,
    enable,
    cooldown,
    permLevel,
    runIn,
    usage,
    aliases,
    description,
  }: ICommandOptions) {
    this.name = name;
    this.enable = enable;
    this.cooldown = cooldown;
    this.runIn = runIn;
    this.aliases = aliases || "";
    this.permLevel = permLevel;
    this.usage = usage;
    this.description = description || "Unspecified.";
  }
  public async run(
    _client: Rice,
    _message: Message,
    ..._args: any
  ): Promise<Message | void> {}
  get getRunIn() {
    return this.runIn;
  }
}

export default Command;

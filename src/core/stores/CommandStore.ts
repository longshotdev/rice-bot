import Store from "../models/Store";
import Command from "../models/Command";
import { Collection } from "discord.js";

class CommandStore extends Store<String, Command> {
  public aliasStore = new Collection<String, Command>();

  public enableCommand(name: string) {
    let command = super.getStore.find((command) => command.name === name);
    if (!command)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    command.enable = true;
  }
  public disableCommand(name: string) {
    let command = super.getStore.find((command) => command.name === name);
    if (!command)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    command.enable = false;
  }
  public toggleCommand(name: string) {
    let command = super.getStore.find((command) => command.name === name);
    if (!command)
      throw new Error("Couldn't find a montitor with '" + name + "'.");
    command.enable = !command.enable;
  }
  get getAliasStore(): Collection<String, Command> {
    return this.aliasStore;
  }
}

export default CommandStore;

import Store from "../models/Store";
import Command from "../models/Command";
import { Collection } from "discord.js";

class CommandStore extends Store<String, Command> {
  public aliasStore = new Collection<String, Command>();

  get getAliasStore(): Collection<String, Command> {
    return this.aliasStore;
  }
}

export default CommandStore;

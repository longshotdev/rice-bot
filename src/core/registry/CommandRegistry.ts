import CommandStore from "../stores/CommandStore";
import Command from "../models/Command";
import Commands from "../../commands";
import _ from "lodash";
import Registry from "./Registry";

/**
 * Keeping it like this cause im a lazy fucker /shrug
 */
class CommandRegistry extends Registry<Command> {
  constructor() {
    super(new CommandStore());
    this.init().catch((e) => {
      throw e;
    });
  }
  private async init(): Promise<void> {
    this.registerModule(Commands.fun, "Fun");
    this.registerModule(Commands.moderation, "Moderation");
    this.registerModule(Commands.system, "System");
    this.registerModule(Commands.music, "Music");
    this.registerModule(Commands.economy, "Economy");
  }
  public registerModule(module: Object, moduleName: string) {
    for (let [, command] of Object.entries(module)) {
      super.registerAll(
        (c: Command) => this.setAlias(c),
        Object.defineProperty(new command(), "category", {
          value: moduleName,
          writable: false,
        })
      );
    }
  }
  public setAlias(command: Command) {
    if (command.aliases) {
      let cmdStore = <CommandStore>(<unknown>super.GetStore);
      for (let alias of command.aliases) {
        console.log("setting shit");
        cmdStore.getAliasStore.set(alias, command);
      }
    }
  }
  get getCommandStore() {
    return <CommandStore>super.GetStore;
  }
}

export default CommandRegistry;

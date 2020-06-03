import CommandStore from "../stores/CommandStore";
import Command from "../models/Command";
import Commands from "../../commands";
import _ from "lodash";
/**
 * Keeping it like this cause im a lazy fucker /shrug
 */
class CommandRegistry {
  private commandStore: CommandStore = new CommandStore();
  constructor() {
    this.init().catch((e) => {
      throw e;
    });
  }
  private async init(): Promise<void> {
    this.registerModule(Commands.fun, "Fun");
    this.registerModule(Commands.moderation, "Moderation");
    this.registerModule(Commands.system, "System");
    this.registerModule(Commands.music, "Music");
  }
  public registerModule(module: Object, moduleName: string) {
    for (let [, command] of Object.entries(module)) {
      this.registerAll(
        Object.defineProperty(new command(), "category", {
          value: moduleName,
          writable: false,
        })
      );
    }
  }
  public registerAll(...commands: Command[]) {
    commands.forEach((command) => {
      this.commandStore.set(command.name, command);
      if (command.aliases) {
        for (let alias of command.aliases) {
          this.commandStore.getAliasStore.set(alias, command);
        }
      }
    });
  }
  get getCommandStore(): CommandStore {
    return this.commandStore;
  }
}

export default CommandRegistry;

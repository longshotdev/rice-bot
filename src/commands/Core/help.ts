import { Message } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";

const ascii = require("ascii-table");
import Rice from "../../core/Rice";
export default class extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "help",
            cooldown: 0,
            description: "Displays Help.",
        });
    }
    public async run(message: Message): Promise<Message> {
        const help: any = await this.buildHelp(Rice.getInstance());
        return message.channel.send(`\`\`\`fix\n${help.toString()}\`\`\``);
    }
    private async buildHelp(client: Rice) {
        const table = new ascii();
        table.setHeading("Name", "Description", "Category");
        client.commandStore.forEach((command) => {
            table.addRow(command.name, command.description, command.category);
        });
        return table;
    }
}

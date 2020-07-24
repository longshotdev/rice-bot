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
        let text: string = help.toString();
        if (text.length > 2000) {
            let splitted = text.match(/([^\n]{1,1990})/g);
            let textBlock = "";
            for (let index = 0; index < splitted!.length; ) {
                let bonk = textBlock.concat(splitted![index]).concat("\n");
                if (!(bonk.length >= 2000)) {
                    textBlock = bonk;
                    index++;
                } else {
                    await message.channel.send(`\`\`\`fix\n${textBlock}\`\`\``);
                    textBlock = "";
                    index--;
                }
            }
            if (textBlock) await message.channel.send(`\`\`\`fix\n${textBlock}\`\`\``);
            return message; // HACK: just return the parent message
        } else return message.channel.send(`\`\`\`fix\n${text}\`\`\``);
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

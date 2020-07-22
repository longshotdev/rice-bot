import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import util from "util";
export default class extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "eval",
            description: "Evaluates Javascript.",
            cooldown: 0,
        });
    }
    public async run(message: Message, args: any[]): Promise<Message> {
        console.log(args);
        const code = args.join(" ");
        console.log(code);
        try {
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = util.inspect(evaled);
            let embed = new MessageEmbed();
            embed.addField("Command:", `\`\`\`xl\n${code}\`\`\``);
            embed.addField("Result:", `\`\`\`xl\n${this.clean(evaled)} \`\`\``);
            embed.setColor("#00FF00");
            embed.setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            embed.setTimestamp(new Date());
            return message.channel.send(embed);
        } catch (err) {
            console.log(err);
            let embed = new MessageEmbed();
            embed.addField("Command:", `\`\`\`xl\n${code}\`\`\``);
            embed.addField("Result:", `\`\`\`xl\n${this.clean(err)} \`\`\``);
            embed.setColor("#FF0000");
            embed.setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
            embed.setTimestamp(new Date());
            return message.channel.send(embed);
        }
    }
    clean = (text: string) => {
        if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    };
}

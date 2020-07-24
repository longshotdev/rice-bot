import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../core/models/discord/Command";
import { CommandStore } from "../../core/stores";
import fetch from "node-fetch";
import { ICurrentValues } from "../../core/models/ICovid19";

export default class bonk extends Command {
    constructor(store: CommandStore, directory: string, files: readonly string[]) {
        super(store, directory, files, {
            name: "covid",
            description: "Provides the latest information on COVID-19.",
            cooldown: 3,
        });
    }
    public async run(message: Message): Promise<Message> {
        const response = await fetch("https://covidtracking.com/api/v1/us/current.json");
        const data: ICurrentValues = (await response.json())[0];
        const embed = new MessageEmbed();
        embed.setAuthor("COVID-19 Tracker.");
        embed.setDescription("Covid-19 tracker for the US. Visit [CovidTracking](https://covidtracking.com/) for more details.");
        embed.addField(
            "Updated on",
            `${data.date.toString().substr(0, 4)}/${data.date.toString().substr(4, 2)}/${data.date.toString().substr(6, 2)}`
        );
        embed.addField("Current Deaths", data.death?.toLocaleString());
        embed.addField("Current Recoveries", data.recovered?.toLocaleString());
        embed.addField("Currently Hospitalized", data.hospitalizedCurrently?.toLocaleString(), true);
        embed.addField("Total Hospitalized", data.hospitalizedCumulative?.toLocaleString(), true);
        embed.addField("Total Hospitalized Increase", data.hospitalizedIncrease?.toLocaleString());
        embed.addField("Currently in ICU", data.inIcuCurrently?.toLocaleString(), true);
        embed.addField("Total in ICU", data.inIcuCumulative?.toLocaleString(), true);
        embed.addField("Tested Positive", data.positive?.toLocaleString(), false);
        embed.addField("Tested Negative", data.negative?.toLocaleString(), true);
        embed.setColor("#32a852");
        embed.setFooter(
            `Information provided by The COVID Tracking Project. (Updated on ${data.date.toString().substr(0, 4)}/${data.date
                .toString()
                .substr(4, 2)}/${data.date.toString().substr(6, 2)})`
        );
        return message.channel.send(embed);
    }
}

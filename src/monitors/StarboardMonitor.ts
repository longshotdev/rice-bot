import { Monitor } from "../core/models/Monitor";
import { MonitorStore } from "../core/stores/MonitorStore";
import { Message, MessageReaction, User, Snowflake, TextChannel, MessageEmbed } from "discord.js";
export default class StarboardMonitor extends Monitor implements Monitor {
    private channel: Snowflake = "736031066615316541";
    private cooldown: Set<Snowflake> = new Set<Snowflake>();
    constructor(store: MonitorStore, dir: string, files: readonly string[]) {
        super(store, dir, files, {
            name: "Starboard",
            ignoreBots: true,
            ignoreSelf: true,
            listensFor: ["messageReactionAdd"],
        });
    }
    public async run(messageReaction: MessageReaction, user: User): Promise<Message | void> {
        const channel = messageReaction.message.channel;
        const message = messageReaction.message;

        if (messageReaction.emoji.name != "⭐") return;
        if (messageReaction.message.author.id == user.id) return;

        // get Starboard channel
        let starChannel = messageReaction.message.guild?.channels.cache.find((channel) => channel.id === this.channel);
        if (!this.channel || !starChannel) return channel.send("No starboard Channel found.");
        /**
         * This fetches the last stars to check if the message was already starred.
         */
        const fetchedStars = await (<TextChannel>starChannel).messages.fetch({ limit: 100 });
        try {
            const starredMessage = fetchedStars.find(
                (starMessage) => starMessage.embeds[0].footer!.text!.startsWith("⭐") && starMessage.embeds[0].footer!.text!.endsWith(message.id)
            );
            if (!starredMessage) {
                if (this.cooldown.has(message.guild!.id)) {
                    await message.react("⏱");
                    return;
                }
                this.cooldown.add(message.guild!.id);
                setTimeout(() => this.cooldown.delete(message.guild!.id), 60000);
                return (<TextChannel>starChannel).send(this.createStarredMessage(messageReaction));
            }

            return this.editStarredMessage(starredMessage, messageReaction);
        } catch (e) {
            message.channel.send(`There was an error: \n\`${e}\``);
        }
    }
    private async editStarredMessage(msg: Message, originalMessage: MessageReaction) {
        const starCount = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(msg.embeds[0].footer!.text!)!;
        const foundStarEmbed = msg.embeds[0]!;
        const embed = new MessageEmbed()
            .setColor(15844367)
            .setDescription(foundStarEmbed.description)
            .setAuthor(originalMessage.message.author.tag, originalMessage.message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter(`⭐ ${parseInt(starCount[1]) + 1} | ${originalMessage.message.id}`);
        return msg.edit(embed);
    }
    private createStarredMessage(originalMessage: MessageReaction) {
        const embed = new MessageEmbed()
            .setColor(15844367)
            .setDescription(originalMessage.message.cleanContent)
            .setAuthor(originalMessage.message.author.tag, originalMessage.message.author.displayAvatarURL())
            .setTimestamp(new Date())
            .setFooter(`⭐ 1 | ${originalMessage.message.id}`);
        return embed;
    }
}

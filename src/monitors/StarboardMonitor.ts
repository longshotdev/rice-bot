import Monitor from "../core/models/Monitor";
import {
  Message,
  MessageReaction,
  User,
  TextChannel,
  MessageEmbed,
} from "discord.js";
import { GSController } from "../api";
import { IGuildSettings } from "../api/controller/IGuildSettingsController";
import { Document } from "mongoose";
export default class extends Monitor {
  constructor() {
    super({
      enabled: true,
      name: "starboard",
      allowedTypes: ["guild"],
      emitsOnlyIn: [],
      emitsOnEvent: ["messageReactionAdd"],
    });
  }
  public async run(
    messageReaction: MessageReaction,
    user: User
  ): Promise<Message | void> {
    if (messageReaction.emoji.name != "⭐") return;

    let gs = <IGuildSettings>(
      (<Document>(
        (<unknown>await GSController.getGuild(messageReaction.message.guild!))
      )).toJSON()
    );
    if (!gs.config.disabledModulesServerWide.includes("starboard")) {
      if (messageReaction.message.author.id === user.id)
        return messageReaction.message.channel.send(
          `${user}, you cannot star your own messages.`
        );

      let channel = messageReaction.message.guild?.channels.cache.find(
        (c) => c.id == gs.config.modules.channels.shChannel
      );
      if (!channel) return messageReaction.message.reply("Setup Starboard");
      // look in the past 100 messages and see if this message was pinned
      let fuckyou = await (<TextChannel>channel).messages.fetch({ limit: 100 });
      try {
        const stars = fuckyou.find(
          (star) =>
            star.embeds[0].footer!.text!.startsWith("⭐") &&
            star.embeds[0].footer!.text!.endsWith(messageReaction.message.id)
        );
        if (stars) {
          const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(
            stars.embeds[0].footer!.text!
          )!;
          // A variable that allows us to use the color of the pre-existing embed.
          const foundStar = stars.embeds[0];
          const embed = new MessageEmbed()
            .setColor(15844367)
            .setDescription(foundStar.description)
            .setAuthor(
              messageReaction.message.author.tag,
              messageReaction.message.author.displayAvatarURL()
            )
            .setTimestamp()
            .setFooter(
              `⭐ ${parseInt(star[1]) + 1} | ${messageReaction.message.id}`
            );
          // We fetch the ID of the message already on the starboard.
          return await stars.edit(embed);
        }
      } catch (e) {
        return await (<TextChannel>channel).send(
          this.createStar(messageReaction)
        );
      }
      return await (<TextChannel>channel).send(
        this.createStar(messageReaction)
      );
    }
  }
  private createStar(messageReaction: MessageReaction): MessageEmbed {
    const embed = new MessageEmbed();
    embed.setColor(15844367);
    embed.setDescription(messageReaction.message.cleanContent);
    embed.setAuthor(
      messageReaction.message.author.tag,
      messageReaction.message.author.displayAvatarURL()
    );
    embed.setTimestamp(new Date());
    embed.setFooter(`⭐ 1 | ${messageReaction.message.id}`);
    return embed;
  }
  protected extension(_reaction: any, attachment: any) {
    //fix later smh
    const imageLink = attachment.split(".");
    const typeOfImage = imageLink[imageLink.length - 1];
    const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
    if (!image) return "";
    return attachment;
  }
}

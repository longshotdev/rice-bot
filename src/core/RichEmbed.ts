/*
 * File: RichEmbed.ts
 * Project: ricebot
 * File Created: Saturday, 18th April 2020 4:14:49 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2020 4:14:49 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import {
  MessageEmbed,
  Message,
  MessageReaction,
  User,
  ReactionCollector,
} from "discord.js";
import IPageMessageEmbed from "./IPageMessageEmbed";

class RichEmbed {
  private embed: MessageEmbed = new MessageEmbed();
  private sentEmbed!: Message;
  private reactionFilter!: ReactionCollector;
  public isPageinated: boolean;
  public pages?: Array<IPageMessageEmbed>;
  public onPage: number = 0;

  constructor(pagination = false, pages?: Array<IPageMessageEmbed>) {
    this.isPageinated = pagination;
    this.pages = pages;
    if (pagination === true && (pages?.length == 0 || pages === undefined)) {
      throw new Error("No pages found. Did you forget to add Pages?");
    }
  }

  get getEmbed(): MessageEmbed {
    return this.embed;
  }
  get getSentEmbed(): Message {
    return this.sentEmbed;
  }
  /**
   * Sends the Embed
   * @param message Original Message Object passed from command.
   * @returns New Message Object (Attach Events with .then() or async/await)
   */
  public async sendEmbed(message: Message): Promise<Message> {
    const sentEmbed = await message.channel
      .send(this.setEmbed(this.pages![0]))
      .then((msg) => (this.sentEmbed = msg));

    if (this.isPageinated) {
      await sentEmbed.react("◀");
      await sentEmbed.react("▶");
      this.reactionFilter = this.sentEmbed.createReactionCollector(
        this.embedFilter,
        {
          time: 30000,
          maxEmojis: 80,
        }
      );
    }
    this.reactionFilter.on("collect", (reaction) =>
      this.handleReactions(reaction)
    );
    this.reactionFilter.on("end", () => {
      sentEmbed.reactions.removeAll();
    });
    return sentEmbed;
  }

  private handleReactions(reaction: MessageReaction) {
    if (this.pages!.length === 0) return;
    if (reaction.emoji.name == "◀") {
      if (this.onPage != 0) {
        this.onPage--;
        this.changePage(reaction);
      }
    } else if (reaction.emoji.name == "▶") {
      if (
        (this.onPage === 0 && this.pages!.length > 1) ||
        this.onPage < this.pages!.length - 1
      ) {
        this.onPage++;
        this.changePage(reaction);
      }
    } else {
    }
  }
  private changePage(reaction: MessageReaction) {
    const currentPage = this.pages![this.onPage];
    reaction.message.edit(this.setEmbed(currentPage));
  }

  private setEmbed(info: IPageMessageEmbed): MessageEmbed {
    const tempEmbed = new MessageEmbed();
    if (info.author)
      tempEmbed.setAuthor(
        info.author.name,
        info.author.iconURL,
        info.author.url
      );
    if (info.color) tempEmbed.setColor(info.color);
    if (info.description) tempEmbed.setDescription(info.description);
    if (info.fields) {
      info.fields.forEach((field) => {
        tempEmbed.addField(field.name, field.value, field.inline);
      });
    }
    if (info.image) tempEmbed.setImage(info.image.url);
    if (info.thumbnail) tempEmbed.setThumbnail(info.thumbnail.url);
    if (info.title) tempEmbed.setTitle(info.title);
    tempEmbed.setFooter(
      `Page: ${this.onPage + 1}/${
        typeof this.pages?.length == "number"
          ? this.pages?.length
          : this.pages?.length
      }`
    );
    return tempEmbed;
  }
  private embedFilter(reaction: MessageReaction, user: User): boolean {
    return (
      (reaction.emoji.name === "◀" || reaction.emoji.name === "▶") && !user.bot
    );
  }
}

export default RichEmbed;

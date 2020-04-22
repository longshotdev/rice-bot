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
    /**
     * Default embed pagination
     */
    this.embed.setFooter(
      `Page: ${this.onPage + 1}/${
        typeof this.pages?.length == "number"
          ? this.pages?.length + 1
          : this.pages?.length
      }`
    );
  }

  get getEmbed(): MessageEmbed {
    return this.embed;
  }
  get getSentEmbed(): Message {
    return this.sentEmbed;
  }
  public async sendEmbed(message: Message): Promise<Message> {
    const sentEmbed = await message.channel
      .send(this.embed)
      .then((msg) => (this.sentEmbed = msg));

    if (this.isPageinated) {
      await sentEmbed.react("◀");
      await sentEmbed.react("▶");
      this.reactionFilter = this.sentEmbed.createReactionCollector(
        this.embedFilter,
        {
          time: 15000,
          maxEmojis: 2,
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
    if (reaction.emoji.name == "◀") {
      if (this.onPage != 0) {
        this.onPage--;
        this.changePage(reaction);
      }
    } else if (reaction.emoji.name == "▶") {
      // @ts-ignore
      if (this.onPage === 0 || this.onPage - 1 > this.pages?.length) {
        this.onPage++;
        this.changePage(reaction);
      }
    }
  }
  private changePage(reaction: MessageReaction) {
    const currentPage = this.pages?.[this.onPage - 1];
    const tempEmbed = new MessageEmbed();
    tempEmbed.setAuthor(currentPage?.author); // TODO: change this;
    //tempEmbed.setColor(currentPage?.color);
    tempEmbed.setDescription(currentPage?.description);
    tempEmbed.setFooter(
      `Page: ${this.onPage + 1}/${
        typeof this.pages?.length == "number"
          ? this.pages?.length + 1
          : this.pages?.length
      }`
    );
    currentPage?.fields?.map((field) => {
      tempEmbed.addField(field.name, field.value, field.inline);
    });
    reaction.message.edit(tempEmbed);
  }
  private embedFilter(reaction: MessageReaction, user: User): boolean {
    return (
      (reaction.emoji.name === "◀" || reaction.emoji.name === "▶") && !user.bot
    );
  }
}

export default RichEmbed;

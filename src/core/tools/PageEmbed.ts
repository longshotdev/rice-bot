import { Page } from "../models/Page";
import Rice from "../Rice";
import { Message, MessageEmbed, MessageReaction, User } from "discord.js";

class PageEmbed {
    private pages: Array<Page> = new Array<Page>();
    protected client: Rice;
    private message: Message;
    private pageNumber: number = 0;
    constructor(client: Rice, message: Message) {
        this.client = client;
        this.message = message;
    }

    public addPages([...pages]: Page[]) {
        for (let page of pages) {
            this.pages.push(page);
        }
        return this;
    }
    public removePage(index: number): void {
        this.pages.splice(index, 1);
    }
    public sendEmbed(): Promise<Message> {
        const message = this.message.channel.send(this.constructEmbed());
        message.then(async (message) => {
            await message.react("◀");
            await message.react("▶");
            const reactionManager = message.createReactionCollector(this.embedFilter, {
                time: 30000, // 30 seconds
                maxEmojis: 20, // can be clicked 100 times.
            });
            reactionManager.on("collect", (reaction) => {
                this.handleReaction(reaction);
            });
            reactionManager.on("end", () => {
                message.reactions.removeAll();
            });
        });
        return message;
    }
    private handleReaction(reaction: MessageReaction) {
        if (reaction.emoji.name == "◀") {
            if (this.pageNumber === 0) return;
            this.pageNumber--;
            this.changePage(reaction);
        } else if (reaction.emoji.name == "▶") {
            if (this.pageNumber >= this.pages.length - 1) return;
            this.pageNumber++;
            this.changePage(reaction);
        }
    }
    private changePage(reaction: MessageReaction) {
        reaction.message.edit(this.constructEmbed(this.pageNumber));
    }
    private constructEmbed(pageNumber = 0): MessageEmbed {
        if (!this.pages[pageNumber]) throw new Error("are you stupid? there isnt a starting page.");
        const embed = new MessageEmbed();
        const page = this.pages[pageNumber];
        page.author ? embed.setAuthor(page.author.name, page.author.iconURL, page.author.url) : null;
        page.color ? embed.setColor(page.color) : null;
        page.description ? embed.setDescription(page.description) : null;
        page.image ? embed.setImage(page.image.url) : null;
        page.thumbnail ? embed.setThumbnail(page.thumbnail.url) : null;
        page.title ? embed.setTitle(page.title) : null;
        page.thumbnail ? embed.setThumbnail(page.thumbnail.url) : null;
        if (page.fields) {
            for (let field of page.fields) {
                embed.addField(field.name, field.value, field.inline);
            }
        }
        embed.setFooter(`Page: ${pageNumber + 1}/${this.pages.length}`);

        return embed;
    }
    private embedFilter(reaction: MessageReaction, user: User): boolean {
        return (reaction.emoji.name === "◀" || reaction.emoji.name === "▶") && !user.bot;
    }
}

export default PageEmbed;

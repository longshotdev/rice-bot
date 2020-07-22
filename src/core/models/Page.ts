import { ColorResolvable, MessageEmbedThumbnail, MessageEmbedImage, MessageEmbedVideo, MessageEmbedAuthor, MessageEmbedProvider } from "discord.js";

interface EmbedField {
    name: string;
    value: string;
    inline: boolean | false;
}
interface IPage {
    title?: string;
    description?: string;
    fields?: Array<EmbedField>;
    url?: string; // TODO: change maybe?
    color?: ColorResolvable;
    timestamp?: Date | null;
    thumbnail?: MessageEmbedThumbnail;
    image?: MessageEmbedImage;
    video?: MessageEmbedVideo;
    author?: MessageEmbedAuthor;
    provider?: MessageEmbedProvider;
}
class Page {
    // HACK: I mean, is this really a hack? All fields are optional
    public title?: string;
    public description?: string;
    public fields?: Array<EmbedField>;
    public url?: string; // TODO: change maybe?
    public color?: ColorResolvable;
    public timestamp?: Date | null;
    public thumbnail?: MessageEmbedThumbnail;
    public image?: MessageEmbedImage;
    public video?: MessageEmbedVideo;
    public author?: MessageEmbedAuthor;
    public provider?: MessageEmbedProvider;

    constructor({ title, description, fields, url, author, color, image, provider, thumbnail, timestamp, video }: IPage) {
        if (title) this.title = title;
        if (description) this.description = description;
        if (fields) this.fields = fields;
        if (url) this.url = url;
        if (author) this.author = author;
        if (color) this.color = color;
        if (image) this.image = image;

        if (provider) this.provider = provider;
        if (thumbnail) this.thumbnail = thumbnail;
        if (timestamp) this.timestamp = timestamp;
        if (video) this.video = video;
    }
    public addFields(field: EmbedField) {
        this.fields?.push(field);
    }
}

export default Page;

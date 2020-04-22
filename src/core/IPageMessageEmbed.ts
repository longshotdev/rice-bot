/*
 * File: IPageMessageEmbed.ts
 * Project: ricebot
 * File Created: Saturday, 18th April 2020 5:09:02 pm
 * Author: andyl5463 (andyl5463@gmail.com)
 * -----
 * Last Modified: Saturday, 18th April 2020 5:09:02 pm
 * Modified By: andyl5463 (andyl5463@gmail.com>)
 * -----
 * Copyright 2020 - 2020 Longshot Development, Longshot Development
 */

import {
  MessageEmbedThumbnail,
  MessageEmbedImage,
  MessageEmbedVideo,
  MessageEmbedAuthor,
  MessageEmbedProvider,
  ColorResolvable,
} from "discord.js";

interface EmbedFields {
  name: string;
  value: string;
  inline: boolean | false;
}
export default interface IPageMessageEmbed {
  title?: string;
  description?: string;
  fields?: Array<EmbedFields>;
  url?: string; // TODO: change maybe?
  color?: ColorResolvable;
  timestamp?: Date | null;
  thumbnail?: MessageEmbedThumbnail;
  image?: MessageEmbedImage;
  video?: MessageEmbedVideo;
  author?: MessageEmbedAuthor;
  provider?: MessageEmbedProvider;
}

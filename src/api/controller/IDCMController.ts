import mongoose, { Schema } from "mongoose";
import { Snowflake, Emoji } from "discord.js";

export interface IDCM {
  id: Snowflake;
  guild: Snowflake;
  channel: Snowflake;
  messageid: Snowflake;
  emojis: Array<Emoji | string>;
  role: Snowflake;
}
const DCMSchema = new Schema({
  id: { type: String, required: true, unique: true },
  guild: { type: String, required: true, unique: true },
  channel: { type: String, required: true, unique: true },
  messageid: { type: String, required: true, unique: true },
  emojis: { type: Array, required: true, unique: true },
  role: { type: String, required: true, unique: true },
});
export default mongoose.model("dcm", DCMSchema);

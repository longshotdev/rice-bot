import mongoose, { Schema } from "mongoose";
import { Snowflake } from "discord.js";

export interface User {
  id: Snowflake;
  experience: number;
  level: number;
}
export interface IE {
  guild: Snowflake;
  users: Array<User>;
}
const IESchema = new Schema({
  guild: { type: String, required: true, unique: true },
  users: { type: Array, required: true },
});
export default mongoose.model("experience", IESchema);

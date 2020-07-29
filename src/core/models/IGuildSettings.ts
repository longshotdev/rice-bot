import { Snowflake } from "discord.js";
export interface IGuildSettings {
    /**
     * Gulid ID for the Guild
     */
    guild: Snowflake;

    /**
     * Owner ID for the guild
     */
    owner: Snowflake;

    /**
     * Array of prefixes
     */
    prefix: Array<String>;

    /**
     * Array of enabled Events
     */
    enabledEvents: Array<String>;
}

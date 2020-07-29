import { IGuildSettings } from "../models/IGuildSettings";
import Rice from "../Rice";
import { Snowflake } from "discord.js";

async function createSettings(guild: IGuildSettings): Promise<IGuildSettings> {
    console.log("fuck you too");
    const client = Rice.getInstance();
    const db = client.db;
    const docGuildSettings = db.get("guildsettings");

    let guildSettings;
    try {
        guildSettings = await docGuildSettings.insert(guild);
    } catch (e) {
        throw e;
    }
    return <IGuildSettings>guildSettings;
}
async function createSettingsWithID(guildID: Snowflake): Promise<IGuildSettings> {
    const client = Rice.getInstance();
    const guild = client.guilds.cache.find((guild) => guild.id === guildID);
    if (!guild) throw new Error(`Guild \`${guildID}\` was not found.`);
    let constructedSettings: IGuildSettings = {
        guild: guildID,
        enabledEvents: [""],
        owner: guild.ownerID,
        prefix: ["+"],
    };
    console.log("i get invoked");
    let shit = await createSettings(constructedSettings);
    return shit;
}
async function getSettings(guildID: Snowflake): Promise<IGuildSettings> {
    const client = Rice.getInstance();
    const db = client.db;
    const docGuildSettings = db.get("guildsettings");

    let guildSettings;
    try {
        let foundedGS = await docGuildSettings.findOne({ guild: guildID });
        if (!foundedGS) {
            guildSettings = await createSettingsWithID(guildID);
        } else {
            guildSettings = foundedGS;
        }
    } catch (e) {}
    return <IGuildSettings>guildSettings;
}

export { createSettings, getSettings, createSettingsWithID };

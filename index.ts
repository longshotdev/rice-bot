import Rice from "./src/core/Rice";
import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "test":
        path = `${__dirname}/.env.test`;
        break;
    case "production":
        path = `${__dirname}/.env.production`;
        break;
    default:
        path = `${__dirname}/.env.dev`;
}
dotenv.config({ path: path });
const Bot = Rice.getInstance();
Bot.login(process.env.DISCORD_TOKEN!).then(() => {});

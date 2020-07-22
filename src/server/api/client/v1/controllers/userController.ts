import { Router } from "express";
// import { checkAuthGuild } from "../../../../../util/checkAuth";
import checkAuth from "../../../../../util/checkAuth";
import IDiscordUser from "../../../discord/IDiscordUser";
import { respondData, STATUS_CODES } from "../../../../../util/jsonResponse";
import request from "node-fetch";
const router = Router();

router.get("/guilds", checkAuth, async (_req, res) => {
  let user = (<IDiscordUser>_req).user;

  let guilds = await request("https://discord.com/api/users/@me/guilds", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + user.accessToken,
      "User-Agent": "DiscordBot " + "githubcom/andyiscool5463/rice-bot 1.0",
    },
  });
  let data = await guilds.json();
  console.log(data);
  respondData(res, STATUS_CODES.OK, data);
});

export default router;

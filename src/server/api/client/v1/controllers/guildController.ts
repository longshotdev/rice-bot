import { Router } from "express";
import Rice from "../../../../../Rice";
import { checkAuthGuild } from "../../../../../util/checkAuth";
import {
  respondData,
  respondMessage,
  STATUS_CODES,
} from "../../../../../util/jsonResponse";
const router = Router();

router.get("/", (_req, res) => {
  res.send("welcome to guild controller.");
});

router.get("/size/", (_req, res) => {
  return res.send(`Guild Size: ${Rice.getInstance().guilds.cache.size}`);
});

router.get("/info/:guildID", checkAuthGuild, (req, res) => {
  const { guildID } = req.params;
  if (!guildID)
    return respondMessage(res, STATUS_CODES.NOTFOUND, "No ID supplied.");
  let guild = Rice.getInstance().guilds.cache.find((gid) => gid.id === guildID);
  if (!guild)
    return respondMessage(res, STATUS_CODES.NOTFOUND, "No guild found.");
  return respondData(res, STATUS_CODES.OK, guild);
});

router.get("/info/:guildID/channels", checkAuthGuild, (req, res) => {
  const { guildID } = req.params;
  if (!guildID)
    return respondMessage(res, STATUS_CODES.NOTFOUND, "No ID supplied.");
  let guild = Rice.getInstance().guilds.cache.find((gid) => gid.id === guildID);
  if (!guild)
    return respondMessage(res, STATUS_CODES.NOTFOUND, "No guild found.");
  return respondData(res, STATUS_CODES.OK, guild.channels.cache);
});

export default router;

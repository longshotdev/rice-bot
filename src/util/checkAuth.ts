import { NextFunction, Request, Response } from "express";
import Rice from "../Rice";
import { respondMessage, STATUS_CODES } from "./jsonResponse";
import IDiscordUser from "../server/api/discord/IDiscordUser";

export function checkAuthGuild(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("hola.", req.isAuthenticated());
  if (!req.isAuthenticated())
    return res.send('not logged in oof. :( go <a href="/">home</a> ');

  let guildID = req.params.guildID;
  if (!guildID)
    return respondMessage(
      res,
      STATUS_CODES.NOTFOUND,
      "Guild not found. (Parameter: guildID not specified.)"
    );

  let guild = Rice.getInstance().guilds.cache.get(guildID);
  if (!guild)
    return respondMessage(res, STATUS_CODES.NOTFOUND, "Guild not found.");
  let castedReq = <IDiscordUser>req;
  if (!guild.member(castedReq.user.id)?.permissions.has("MANAGE_GUILD"))
    return respondMessage(res, STATUS_CODES.NOAUTH, "Guild Owner ID mismatch.");

  return next();
}

export default function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) return next();
  res.send('not logged in :( go <a href="/">home</a> ');
}

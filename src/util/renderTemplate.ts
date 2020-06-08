import path from "path";
import { Request, Response } from "express";
import Rice from "../Rice";

export default function renderTemplate(
  res: Response,
  req: Request,
  template: string,
  data = {}
) {
  const base = {
    bot: Rice.getInstance(),
    path: req.path,
    user: req.isAuthenticated() ? req.user : null,
  };
  res.render(
    path.join(process.cwd(), "src/server/views", template),
    Object.assign(base, data)
  );
}

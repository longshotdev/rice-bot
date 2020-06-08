import { Router } from "express";
// import { checkAuthGuild } from "../../../../../util/checkAuth";

const router = Router();

router.post("/createEmbed", (_req, res) => {
  res.send("hola!");
});

export default router;

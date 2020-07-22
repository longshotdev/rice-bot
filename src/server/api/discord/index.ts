import { Router } from "express";
import passport from "passport";
export const scopes = ["identify", "email", "guilds", "guilds.join"];
const router = Router();
router.get(
  "/login",
  passport.authenticate("discord", { scope: scopes, prompt: "consent" }),
  (_req, _res) => {}
);
router.get(
  "/authenticate",
  passport.authenticate("discord", { failureRedirect: "/" }),
  (_req, res) => res.redirect("/dashboard")
);
router.get("/authenticate-guild", (_req, res) => {
  console.log(_req);
  res.redirect("/");
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

export default router;

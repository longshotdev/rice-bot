import { Router } from "express";
import guildController from "./controllers/guildController";
import commandController from "./controllers/commandController";
import userController from "./controllers/userController";
const router = Router();

router.get("/", (_req, res) => {
  res.send("welcome to v1 gateway.");
});

router.use("/guild", guildController);
router.use("/command", commandController);
router.use("/user", userController);
export default router;

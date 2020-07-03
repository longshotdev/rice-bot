import Timer from "../models/Timer";
import { minutes } from "../../util/time";

class ServerInfo extends Timer {
  constructor() {
    super({
      enabled: true,
      name: "ServerInfo",
      repeat: true,
      time: minutes(3),
    });
  }
  run() {}
}
export default ServerInfo;

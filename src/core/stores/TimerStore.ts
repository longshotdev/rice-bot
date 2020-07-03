import Store from "../models/Store";
import Timer from "../models/Timer";
import Rice from "../../Rice";

class TimerStore extends Store<String, Timer> {
  run() {}
  enableTimer() {}
  disableTimer(name: string) {
    let timer = Rice.getInstance().timerRegistry.GetStore.get(name)!;
    if (!timer.enabled) {
      return;
    }
    let fckyou = Rice.getInstance().timerRegistry.internalStore.getStore.findKey(
      (v: Timer, _k: number) => v.name === name
    )!;
    if (!fckyou) return;

    clearInterval(fckyou);
    timer.enabled = false;
    Rice.getInstance().timerRegistry.internalStore.delete(fckyou);
  }
}

export default TimerStore;

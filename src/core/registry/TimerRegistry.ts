import Registry from "./Registry";
import Timer from "../models/Timer";
import TimerStore from "../stores/TimerStore";
import Store from "../models/Store";

class TimerRegistry extends Registry<Timer> {
  private InternalStore: Store<number, Timer>;

  constructor() {
    let timerStore = new TimerStore();
    super(timerStore);
    this.InternalStore = new Store<number, Timer>();
    this.init();
  }
  private init(): void {
    super.registerAll(
      (v: Timer) => this.addListener(v) // imagine using sped head ass anonymous functions lmfaoo
    );
  }
  private addListener(timer: Timer) {
    let internalID = setInterval(() => {
      timer.run();
    });
    this.InternalStore.set(internalID, timer);
  }
  get internalStore() {
    return this.InternalStore;
  }
}

export default TimerRegistry;

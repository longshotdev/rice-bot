import Store from "../models/Store";

interface IRegistry {
  name: string;
}
class Registry<T extends IRegistry> {
  private store: Store<String, T>;

  constructor(store: Store<String, T>) {
    this.store = store;
  }
  protected registerAll(special?: Function | null, ...registryType: T[]) {
    registryType.forEach((v, i, a) => {
      this.register(v, i, a);
      if (special) special(v);
    });
  }
  protected async register(
    type: T,
    _index?: number,
    _array?: Array<T>,
    special?: Function
  ) {
    this.store.set(type.name, type);
    if (special) special();
    return this.store;
  }
  public getStore() {
    return (this.store as unknown) as T;
  }
}

export default Registry;

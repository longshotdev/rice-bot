
export class Store<V> {
  protected store = new Set<V>();
  public holds: V;

  public constructor(name: string, holds: V) {
    this.holds = holds;
  }
  public add(v: V) {
    if(!(v instanceof this.holds))
  }
  get size(): number {
    return this.store.size;
  }
}

export class Store<V> {
  protected store = new Set<V>();
  public holds: V;
  public name: string;

  public constructor(name: string, holds: V) {
    this.holds = holds;
    this.name = name;
    console.log((holds as unknown) as string);
  }
  public add(v: V) {
    this.store.add(v);
  }
  get size(): number {
    return this.store.size;
  }
}

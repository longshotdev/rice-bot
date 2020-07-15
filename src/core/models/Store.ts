import Fragment from "./Fragment";
import { Cache } from "./Cache";
/**
 * This shit is supposed to store types of shit not fuckign strings you fuckface cum rag.
 */
export class Store<V extends Fragment> extends Cache<string, V> {
    public holds: FragConstructor<V>;
    public name: string;

    public constructor(name: string, holds: FragConstructor<V>) {
        super();
        this.holds = holds;
        this.name = name;
    }

    public add(v: V) {
        this.add(v);
    }

    public remove(v: V | string) {
        const fat = this.resolve(v);
        if (!fat) return;
        super.delete(fat.name);
    }

    public resolve(name: V | string): V | null {
        if (name instanceof this.holds) return name;
        return this.get(name as string) || null;
    }

    get size(): number {
        return super.size;
    }

    public static get [Symbol.species](): typeof Cache {
        return Cache;
    }
}
// ????
export type FragConstructor<T> = new (...args: ConstructorParameters<typeof Fragment>) => T;

import { Fragment } from "./Fragment";
import { Cache } from "./Cache";
import { join, extname, relative, sep } from "path";
import { scan } from "fs-nextra";
import { isClass } from "../../util/isClass";
import chalk from "chalk";
/**
 * This shit is supposed to store types of shit not fuckign strings you fuckface cum rag.
 */
export class Store<V extends Fragment> extends Cache<string, V> {
    public holds: FragConstructor<V>;
    public name: string;
    public directory: string;

    public constructor(name: string, holds: FragConstructor<V>, directory: string) {
        super();
        this.holds = holds;
        this.name = name;
        this.directory = directory;
        (async () => {
            await this.loadAll();
        })();
    }
    public async load(directory: string, file: readonly string[]): Promise<V | null> {
        const location = join(directory, ...file);
        let piece = null;
        try {
            const loaded = (await import(process.cwd() + "/" + location)) as { default: FragConstructor<V> } | FragConstructor<V>;
            const fragment = "default" in loaded ? loaded.default : loaded;
            if (!isClass(fragment)) throw new TypeError("This shit isn't a fucking class idiot");
            piece = this.add(new fragment(this, directory, file));
        } catch (e) {
            console.log(e);
        }
        delete require.cache[location];
        module.children.pop();
        return piece;
    }
    public async loadAll(): Promise<number> {
        this.clear();
        await Store.walk(this, this.directory);
        return this.size;
    }
    public add(v: V): V {
        super.set(v.name, v);
        return v;
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
    private static async walk<T extends Fragment>(store: Store<T>, directory: string): Promise<T[]> {
        try {
            const files = await scan(directory, {
                filter: (stats: { isFile: () => any; name: string }) =>
                    (stats.isFile() && extname(stats.name) === ".ts") || (stats.isFile() && extname(stats.name) === ".js"),
            });
            console.log(`Loaded ${chalk.yellow(files.size)} files from ${directory}`);
            return Promise.all([...files.keys()].map((file) => store.load(directory, relative(directory, file).split(sep)) as Promise<T>));
        } catch {
            return [];
        }
    }
}
// ????
export type FragConstructor<T> = new (...args: ConstructorParameters<typeof Fragment>) => T;

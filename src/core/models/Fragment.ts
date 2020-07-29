import { join, basename, extname } from "path";
import { Store } from "./Store";

export class Fragment {
    public readonly file: readonly string[];
    public readonly dir: string;
    public name: string;
    public store: Store<Fragment>;
    public enabled: boolean;

    public constructor(store: Store<Fragment>, directory: string, file: readonly string[], options: FragmentOptions = {}) {
        this.file = file;
        this.dir = directory;
        this.name = options.name ?? basename(file[file.length - 1], extname(file[file.length - 1]));
        this.enabled = options.enabled ?? true;
        this.store = store;
    }

    public get type(): string {
        throw new Error("NOT IMPLEMENTED.");
    }
    public get path(): string {
        return join(this.dir, ...this.file);
    }
}

export interface FragmentOptions {
    /**
     * Name of the Fragment
     */
    name?: string;
    /**
     * Fragment Enabled or not.
     */
    enabled?: boolean;
}

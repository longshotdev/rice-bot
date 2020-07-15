import { join, basename, extname } from "path";

export default class Fragment {
  public readonly file: readonly string[];
  public readonly dir: string;
  public name: string;
  public enabled: boolean;

  public constructor(
    directory: string,
    file: readonly string[],
    options: FragmentOptions = {}
  ) {
    this.file = file;
    this.dir = directory;
    this.name =
      options.name ??
      basename(file[file.length - 1], extname(file[file.length - 1]));
    this.enabled = options.enabled ?? true;
  }

  public get type(): string {
    throw new Error("NOT IMPLEMENTED.");
  }
  public get path(): string {
    return join(this.dir, ...this.file);
  }
}

export interface FragmentOptions {
  name?: string;
  enabled?: boolean;
}

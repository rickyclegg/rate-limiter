import { Bucket } from "./types";
import { AllowParams } from "../types";

interface Options {
  filename: string;
  reader(filename: string, encoding: "utf8"): Promise<string>;
}

export class DiskBucket implements Bucket {
  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  public async get(id: AllowParams["id"]): Promise<number> {
    const rawFile = await this.options.reader(this.options.filename, "utf8");
    const memory: Record<string, number> = JSON.parse(rawFile)

    return memory[id] ?? 0
  }

  public set(id: AllowParams["id"], increment: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  public delete(id: AllowParams["id"]): Promise<void> {
    return Promise.resolve(undefined);
  }
}

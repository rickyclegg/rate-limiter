import { Bucket } from "./types";
import { AllowParams } from "../types";

interface Options {
  filename: string;
  reader(filename: string, encoding: "utf8"): Promise<string>;
  writer(filename: string, data: string): Promise<void>;
}

export class DiskBucket implements Bucket {
  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  public async get(id: AllowParams["id"]): Promise<number> {
    const rawFile = await this.options.reader(this.options.filename, "utf8");
    const memory: Record<string, number> = JSON.parse(rawFile);

    return memory[id] ?? 0;
  }

  public async set(id: AllowParams["id"], increment: number): Promise<void> {
    let numberOfCalls = await this.get(id);
    numberOfCalls += increment;

    await this.options.writer(
      this.options.filename,
      JSON.stringify({ [id]: numberOfCalls })
    );
  }

  public delete(id: AllowParams["id"]): Promise<void> {
    return Promise.resolve(undefined);
  }
}

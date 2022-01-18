import { Bucket } from "./types";
import { AllowParams } from "../types";

interface Options {
  filename: string;
  reader(filename: string, encoding: "utf8"): Promise<string>;
  writer(filename: string, data: string): Promise<void>;
}

type BucketMemory = Record<string, number>

export class DiskBucket implements Bucket {
  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  private async getBucket(): Promise<BucketMemory> {
    const rawFile = await this.options.reader(this.options.filename, "utf8");

    return JSON.parse(rawFile)
  }

  public async get(id: AllowParams["id"]): Promise<number> {
    const memory = await this.getBucket();

    return memory[id] ?? 0;
  }

  public async set(id: AllowParams["id"], increment: number): Promise<void> {
    const memory = await this.getBucket();
    let numberOfCalls = memory[id] ?? 0;
    numberOfCalls += increment;

    await this.options.writer(
      this.options.filename,
      JSON.stringify({ ...memory, [id]: numberOfCalls })
    );
  }

  public delete(id: AllowParams["id"]): Promise<void> {
    return Promise.resolve(undefined);
  }
}

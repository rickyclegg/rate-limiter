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

  private static getBucketValue(memory: BucketMemory, id: AllowParams["id"]): number {
    return memory[id] ?? 0;
  }

  constructor(options: Options) {
    this.options = options;
  }

  private async getBucket(): Promise<BucketMemory> {
    const rawFile = await this.options.reader(this.options.filename, "utf8");

    return JSON.parse(rawFile)
  }

  public async get(id: AllowParams["id"]): Promise<number> {
    const memory = await this.getBucket();

    return DiskBucket.getBucketValue(memory, id);
  }

  public async set(id: AllowParams["id"], increment: number): Promise<void> {
    const memory = await this.getBucket();
    let numberOfCalls = DiskBucket.getBucketValue(memory, id);
    numberOfCalls += increment;

    await this.options.writer(
      this.options.filename,
      JSON.stringify({ ...memory, [id]: numberOfCalls })
    );
  }

  public delete(id: AllowParams["id"]): Promise<void> {
    console.log('DELETE THE CALL COUNT')

    return Promise.resolve(undefined);
  }
}

import { DiskBucket } from "./disk-bucket";

describe("Disk Bucket", () => {
  it("should get me the call count from disk", async () => {
    const id = "myTestKey";
    const numberOfCalls = 3;
    const stubDiskReader = async () => {
      return JSON.stringify({ [id]: numberOfCalls });
    };
    const dummyDiskWriter = jest.fn().mockResolvedValue(undefined);

    const db = new DiskBucket({
      reader: stubDiskReader,
      writer: dummyDiskWriter,
      filename: "dummyFilename",
    });

    expect(await db.get(id)).toEqual(numberOfCalls);
  });

  it("should return 0 for call counts that do not exist", async () => {
    const id = "myTestKey";
    const numberOfCalls = 0;
    const stubDiskReader = async () => {
      return JSON.stringify({});
    };
    const dummyDiskWriter = jest.fn().mockResolvedValue(undefined);

    const db = new DiskBucket({
      reader: stubDiskReader,
      writer: dummyDiskWriter,
      filename: "dummyFilename",
    });

    expect(await db.get(id)).toEqual(numberOfCalls);
  });

  it("should call the writer to store the bucket in memory", async () => {
    const id = "myTestKey";
    const numberOfCalls = 0;
    const stubDiskReader = async () => {
      return JSON.stringify({});
    };
    const stubDiskWriter = jest.fn().mockResolvedValue(undefined);

    const db = new DiskBucket({
      reader: stubDiskReader,
      writer: stubDiskWriter,
      filename: "dummyFilename",
    });

    await db.set(id, 1);

    expect(stubDiskWriter).toHaveBeenCalledWith(
      "dummyFilename",
      JSON.stringify({ [id]: numberOfCalls + 1 })
    );
  });
});

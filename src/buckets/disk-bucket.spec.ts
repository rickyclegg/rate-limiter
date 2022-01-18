import { DiskBucket } from "./disk-bucket";

describe("Disk Bucket", () => {
  it("should get me the call count from disk", async () => {
    const id = "myTestKey";
    const numberOfCalls = 3;
    const stubDiskReader = async () => {
      return JSON.stringify({ [id]: numberOfCalls });
    };

    const db = new DiskBucket({
      reader: stubDiskReader,
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

    const db = new DiskBucket({
      reader: stubDiskReader,
      filename: "dummyFilename",
    });

    expect(await db.get(id)).toEqual(numberOfCalls);
  });
});

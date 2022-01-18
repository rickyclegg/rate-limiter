import { DiskBucket } from "./disk-bucket";

describe("Disk Bucket", () => {
  const createTestDeps = () => ({
    reader: jest.fn().mockResolvedValue("{}"),
    writer: jest.fn().mockResolvedValue(undefined),
  });

  it("should get me the call count from disk", async () => {
    const id = "myTestKey";
    const numberOfCalls = 3;
    const { reader, writer } = createTestDeps();

    reader.mockResolvedValue(JSON.stringify({ [id]: numberOfCalls }));

    const db = new DiskBucket({
      reader,
      writer,
      filename: "dummyFilename",
    });

    expect(await db.get(id)).toEqual(numberOfCalls);
  });

  it("should return 0 for call counts that do not exist", async () => {
    const id = "myTestKey";
    const numberOfCalls = 0;
    const { reader, writer } = createTestDeps();

    const db = new DiskBucket({
      reader,
      writer,
      filename: "dummyFilename",
    });

    expect(await db.get(id)).toEqual(numberOfCalls);
  });

  it("should call the writer to store the bucket in memory", async () => {
    const id = "myTestKey";
    const numberOfCalls = 0;
    const { reader, writer } = createTestDeps();

    const db = new DiskBucket({
      reader,
      writer,
      filename: "dummyFilename",
    });

    await db.set(id, 1);

    expect(writer).toHaveBeenCalledWith(
      "dummyFilename",
      JSON.stringify({ [id]: numberOfCalls + 1 })
    );
  });
});

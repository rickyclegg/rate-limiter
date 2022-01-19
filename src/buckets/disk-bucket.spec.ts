import { DiskBucket } from "./disk-bucket";

describe("Disk Bucket", () => {
  const createTestDeps = () => ({
    reader: jest.fn().mockResolvedValue("{}"),
    writer: jest.fn().mockResolvedValue(undefined),
    id: `key-${Math.floor(Math.random() * 100000)}`,
    filename: `filename-${Math.floor(Math.random() * 100000)}`,
  });

  describe("reading", () => {
    it("should get me the call count from disk", async () => {
      const numberOfCalls = 3;
      const { id, filename, reader, writer } = createTestDeps();

      reader.mockResolvedValue(JSON.stringify({ [id]: numberOfCalls }));

      const db = new DiskBucket({ reader, writer, filename });

      expect(await db.get(id)).toEqual(numberOfCalls);
    });

    it("should return 0 for call counts that do not exist", async () => {
      const numberOfCalls = 0;
      const { id, filename, reader, writer } = createTestDeps();

      const db = new DiskBucket({ reader, writer, filename });

      expect(await db.get(id)).toEqual(numberOfCalls);
    });
  });

  describe("writing", () => {
    it("should call the writer to store the bucket in memory", async () => {
      const numberOfCalls = 0;
      const { id, filename, reader, writer } = createTestDeps();

      const db = new DiskBucket({ reader, writer, filename });

      await db.set(id, 1);

      expect(writer).toHaveBeenCalledWith(
        filename,
        JSON.stringify({ [id]: numberOfCalls + 1 })
      );
    });

    it("should call the writer to store the entire bucket in memory", async () => {
      const numberOfCalls = 0;
      const { id, filename, reader, writer } = createTestDeps();

      const db = new DiskBucket({ reader, writer, filename });
      reader.mockResolvedValue(JSON.stringify({ shouldPreserve: 3 }));

      await db.set(id, 1);

      expect(writer).toHaveBeenCalledWith(
        filename,
        JSON.stringify({ shouldPreserve: 3, [id]: numberOfCalls + 1 })
      );
    });
  });

  describe("deleting", () => {
    it("should remove the property from the memory bucket and write to disk", async () => {
      const { id, filename, reader, writer } = createTestDeps();

      const db = new DiskBucket({ reader, writer, filename });

      reader.mockResolvedValue(JSON.stringify({ [id]: 0 }));

      await db.delete(id)

      expect(writer).toHaveBeenCalledWith(filename, JSON.stringify({}));
    });
  });
});

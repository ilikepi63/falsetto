import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";

describe("Clustering Column Test Suite", () => {
    it("should create a clustering column with the appropriate properties", () => {
        const c = new ClusteringColumn({ name: "test" });

        expect(c.direction).toBe("asc");
        expect(c.name).toBe("test");
    });
});
import { Schema, TextAttribute, UuidAttribute, Table } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
import { createClusteringKey, createPartitionKey, createPrimaryKey, createTable, createClusteringOrder, createClusteringColumn, typeFromAttributeEntry, attributesFromQuery } from "../src/cql-generators/create-table";
import { createNameFromQuery, parenthesis } from "../src/cql-generators/utils";

describe("Testing Create Table", () => {

    const personId = new UuidAttribute("id");
    const firstName = new TextAttribute("first_name");
    const lastName = new TextAttribute("last_name");
    const email = new TextAttribute("email");

    const personSchema = new Schema("person", {
        id: personId,
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    const queryByEmail = Table.from(personSchema)
        .by(email);

    const queryByfirstNameLastName = Table.from(personSchema)
        .by([firstName, lastName])
        .orderBy([new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc })]);

    it("Should create a string version of an attribute", () => {
        expect(typeFromAttributeEntry(personId)).toBe("id uuid");
    });

    it("should result in the correct output attributes", () => {
        expect(attributesFromQuery(queryByEmail)).toBe("id uuid,\nfirst_name text,\nlast_name text,\nemail text");
    });

    it("should surround the string with parenthesis", () => {
        expect(parenthesis("Hello")).toBe("(Hello)");
    });

    it("Should correctly create the clustering keys", () => {
        expect(createClusteringKey(["key1", "key2"])).toBe("key1, key2");
    });

    it("Should correctly create the partition key", () => {
        expect(createPartitionKey(["key1", "key2"])).toBe("(key1, key2)");
    });

    it("Should correctly create the primary key", () => {
        expect(createPrimaryKey(queryByfirstNameLastName)).toBe("PRIMARY KEY ((first_name, last_name), email)");
    });

    it("Should create the clustering column correctly", () => {
        const column = new ClusteringColumn({ direction: ClusteringDirection.asc, name: "added_date" });

        expect(createClusteringColumn(column)).toBe("added_date asc");
    });

    it("Should correctly create the clustering order", () => {
        const column1 = new ClusteringColumn({ direction: ClusteringDirection.asc, name: "added_date" });
        const column2 = new ClusteringColumn({ direction: ClusteringDirection.desc, name: "name" });
        expect(createClusteringOrder([column1, column2],)).toBe("WITH CLUSTERING ORDER BY (added_date asc name desc)");
    });


    it("Should create the query name correctly", () => {
        expect(createNameFromQuery(queryByEmail)).toBe("person_by_email");
    });

    it("Should create a table definition correctly", () => {
        expect(createTable(queryByfirstNameLastName)).toBe("CREATE TABLE person_by_first_name_last_name (\nid uuid,\nfirst_name text,\nlast_name text,\nemail text,\nPRIMARY KEY ((first_name, last_name), email)\n) WITH CLUSTERING ORDER BY (email asc);");
    });

});

describe("Create Partition Key", () => {

    const personId = new UuidAttribute("id");
    const firstName = new TextAttribute("first_name");
    const lastName = new TextAttribute("last_name");
    const email = new TextAttribute("email");

    const personSchema = new Schema("person", {
        id: personId,
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    const queryByEmail = Table.from(personSchema);

    it("should throw an error if the query does not have a partition key", () => {
        expect(() => {
            createPrimaryKey(queryByEmail);
        }).toThrowError(new TypeError("You cannot create a table with no primary key."));
    });
});
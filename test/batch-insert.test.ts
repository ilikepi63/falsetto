import { Table, Schema, TextAttribute, UuidAttribute } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
import BatchExecutable from "../src/executables/batch-executable";

describe("Batch Insert Test Suite", () => {

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


    it("should create a batch insert", () => {

        const newPerson = { id: "123", firstName: "Name", lastName: "Name", email: "email" };

        const batchExecutable = personSchema.put(newPerson);

        expect((batchExecutable as BatchExecutable).queries).toStrictEqual([
            {
                query: "INSERT INTO person_by_email (id, first_name, last_name, email) VALUES (?, ?, ?, ?);",
                params: ["123", "Name", "Name", "email"]
            },
            {
                query: "INSERT INTO person_by_first_name_last_name (id, first_name, last_name, email) VALUES (?, ?, ?, ?);",
                params: ["123", "Name", "Name", "email"]
            }
        ]);
    });

    it("should throw a Type Error", () => {

        const newPerson = { firstName: "Name", lastName: "Name", email: "email" };

        expect(() => {
            personSchema.put(newPerson);
        }).toThrowError(new TypeError("Attribute id is empty. You can't insert null data."));

    });

});
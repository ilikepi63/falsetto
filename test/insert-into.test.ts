import { Table, Schema, TextAttribute, UuidAttribute } from "../src";
import ListAttribute from "../src/attributes/collection/list-attribute";
import MapAttribute from "../src/attributes/collection/map-attribute";
import SetAttribute from "../src/attributes/collection/set-attribute";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
import { createColumnList, createInsertStatement, createPreparedStatement } from "../src/cql-generators/insert-into";
import { Client, } from "cassandra-driver";

// query: string, params ?: ArrayOrObject, options ?: QueryOptions
class MockClient extends Client {
    execute = jest.fn();
}



describe("Insert Into Test Suite", () => {
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


    it("Should return a complete insert into query", () => {

        expect(createInsertStatement(queryByEmail)).toBe("INSERT INTO person_by_email (id, first_name, last_name, email) VALUES (?, ?, ?, ?);");

        expect(createInsertStatement(queryByfirstNameLastName)).toBe("INSERT INTO person_by_first_name_last_name (id, first_name, last_name, email) VALUES (?, ?, ?, ?);");
    });


    it("Should return a complete insert into query with a cas operation", () => {

        expect(createInsertStatement(queryByEmail, { ifNotExists: true })).toBe("INSERT INTO person_by_email (id, first_name, last_name, email) VALUES (?, ?, ?, ?) IF NOT EXISTS;");

        expect(createInsertStatement(queryByfirstNameLastName, { ifNotExists: true })).toBe("INSERT INTO person_by_first_name_last_name (id, first_name, last_name, email) VALUES (?, ?, ?, ?) IF NOT EXISTS;");
    });

    it("should return a valid list of attribute names", () => {
        expect(createColumnList(queryByEmail)).toBe("(id, first_name, last_name, email)");
    });

    it("should return a correct prepared statement", () => {
        expect(createPreparedStatement(queryByEmail)).toBe("(?, ?, ?, ?)");
    });

    // collection type create statement
    it("Should create a correct map insert statement", () => {

        const client = new MockClient({
            contactPoints: ["test"],
            keyspace: "",

        });

        // collections test
        const personIdCollection = new UuidAttribute("id");
        const firstNameCollection = new TextAttribute("first_name");
        const lastNameCollection = new TextAttribute("last_name");
        const emailCollection = new SetAttribute("email", new TextAttribute("email"));


        const personSchemaCollection = new Schema("person", {
            id: personIdCollection,
            firstName: firstNameCollection,
            lastName: lastNameCollection,
            email: emailCollection,
            attributes: new MapAttribute("attributes", { keyType: new TextAttribute("key"), valueType: new TextAttribute("value") }),
            interests: new ListAttribute("interests", new TextAttribute("attribute"))
        });

        const queryByEmailCollection = Table.from(personSchemaCollection)
            .by(email);


        const insertStatement = personSchemaCollection.put({
            id: "123",
            firstName: "Test",
            lastName: "Test",
            email: ["test@test.com", "test1@test.com"],
            attributes: { test: "test" },
            interests: ["test"]
        })
            .execute(client);

        expect(client.execute.mock.calls.length).toBe(1);
        expect(client.execute.mock.calls[0][0]).toBe("INSERT INTO person_by_email (id, first_name, last_name, email, attributes, interests) VALUES (?, ?, ?, ?, ?, ?);");
        expect(client.execute.mock.calls[0][1]).toStrictEqual(["123", "Test", "Test", ["test@test.com", "test1@test.com"], { test: "test" }, ["test"]]);
        expect(client.execute.mock.calls[0][2]).toStrictEqual({ prepare: true });



    });
});
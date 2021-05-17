import { Table, Schema, TextAttribute, UuidAttribute } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
import { createColumnList, createInsertStatement, createPreparedStatement } from "../src/cql-generators/insert-into";

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
});
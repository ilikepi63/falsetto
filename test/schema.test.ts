import { Schema, Table, TextAttribute, UuidAttribute } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
import { createTable } from "../src/cql-generators/create-table";
import SingleExecutable from "../src/executables/single-executable";

describe("Schema Test Suite", () => {

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

    const queryById = Table.from(personSchema).by(personId).orderBy([new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc })]);


    const createTableExecutable = personSchema.createTables();

    const exec = new SingleExecutable(createTable(queryById), []);

    it("should create correct executables", () => {
        expect(createTableExecutable.executables).toStrictEqual([exec]);
    });

});
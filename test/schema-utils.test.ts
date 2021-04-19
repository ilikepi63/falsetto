import { Schema, Table, TextAttribute, UuidAttribute } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
import { NoViableTablesError } from "../src/errors";
import { getBestFitTable, getTableFromSchema, partitionDoesMatch, getPoint } from "../src/schema-utils";

describe("Schema Utils Test Suite", () => {

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

    const personSchema2 = new Schema("person2", {
        id: personId,
        firstName: firstName,
        lastName: lastName,
        email: email
    });

    const queryById = Table.from(personSchema).by(personId).orderBy([new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc })]);

    const queryByIdOrderByFirstName = Table.from(personSchema).by(personId).orderBy([new ClusteringColumn({ name: firstName.name, direction: ClusteringDirection.asc })]);

    const queryByEmail = Table.from(personSchema)
        .by(email)
        .orderBy([new ClusteringColumn({ name: firstName.name, direction: ClusteringDirection.desc }), new ClusteringColumn({ name: lastName.name, direction: ClusteringDirection.asc })]);

    const queryByfirstNameLastName = Table.from(personSchema)
        .by([firstName, lastName])
        .orderBy([new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc })]);


    /** First, test the ability to find the best fit table from a list of tables.
     * 
     */
    it("should select the correct table from a clustering column.", () => {
        const result = getBestFitTable([queryByEmail, queryById, queryByfirstNameLastName], ["first_name", "last_name"]);
        expect(result.clusteringColumns).toStrictEqual(queryByEmail.clusteringColumns);
    });

    it("should sekect the correct table based on the email clustering column", () => {
        const result = getBestFitTable([queryByEmail, queryById, queryByfirstNameLastName], ["email"]);
        expect(result.clusteringColumns).toStrictEqual(queryByfirstNameLastName.clusteringColumns);
    });


    /** Testing "partitionDoesMatch"
     * 
     */
    it("ensure that a partition by a email matches a list of partition keys ", () => {

        expect(partitionDoesMatch(["email"])(queryByEmail)).toBe(true);
        expect(partitionDoesMatch(["email"])(queryById)).toBe(false);
    });

    it("ensure that a partition by a email matches a list of partition keys ", () => {

        expect(partitionDoesMatch(["first_name", "last_name"])(queryByfirstNameLastName)).toBe(true);
        expect(partitionDoesMatch(["first_name", "last_name"])(queryById)).toBe(false);
    });

    it("ensure that a partition by a email matches a list of partition keys ", () => {

        expect(partitionDoesMatch(["id"])(queryById)).toBe(true);
        expect(partitionDoesMatch(["id"])(queryByEmail)).toBe(false);
    });

    /** Test Get point.
     *  
     */
    it("Test a correct and an incorrect point", () => {

        expect(getPoint(["id"])(new ClusteringColumn({ name: personId.name, direction: ClusteringDirection.asc }))).toBe(1);
        expect(getPoint(["id"])(new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc }))).toBe(0);
    });


    /** Get Table From Schema
     * 
     */
    it("Should get the correct table schema id partition keys based on the given key structure.", () => {
        expect(getTableFromSchema(["id"], [], personSchema)?.partitionKey).toBe(queryById.partitionKey);
    });

    it("Should get the correct table schema partition keys based on the given key structure.", () => {
        expect(getTableFromSchema(["first_name", "last_name"], [], personSchema)?.partitionKey).toBe(queryByfirstNameLastName.partitionKey);
    });

    it("Should get the correct table schema partition keys based on the given key structure.", () => {
        expect(getTableFromSchema(["email"], [], personSchema)?.partitionKey).toBe(queryByEmail.partitionKey);
    });

    it("Should get the correct table schema partition keys based on the given key structure.", () => {
        const table = getTableFromSchema(["id"], ["first_name"], personSchema);

        expect(table?.partitionKey).toBe(queryByIdOrderByFirstName.partitionKey);
        expect(table?.clusteringColumns).toBe(queryByIdOrderByFirstName.clusteringColumns);
    });


    it("Should check that the table returns no viable tables.", () => {

        expect(() => {
            getTableFromSchema(["id"], ["first_name"], personSchema2);
        }).toThrowError(NoViableTablesError);
    });


});
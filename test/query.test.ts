import { Client, } from "cassandra-driver";
import { Schema, Table, UuidAttribute, TextAttribute, Query } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";
// query: string, params ?: ArrayOrObject, options ?: QueryOptions
class MockClient extends Client {
    execute = jest.fn();
}


describe("Query Test Suite", () => {

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

    const queryByEmail = Table.from(personSchema)
        .by(email);

    const queryByfirstNameLastName = Table.from(personSchema)
        .by([firstName, lastName])
        .orderBy([new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc })]);




    it("Should find the correct query to execute - integration", async () => {

        const get = personSchema
            .get(["name", "id"])
            .where("id")
            .equals("123")
            .and("email")
            .equals("test@test.com");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT name, id FROM person_by_id WHERE id = ? AND email = ?;");
        expect(params).toStrictEqual(["123", "test@test.com"]);

    });

    it("should throw if we construct without a table or schema", async () => {


        expect(() => {
            const get = new Query({});
        }).toThrow();

    });

    it("Should find the correct query to execute - integration", async () => {

        const get = personSchema
            .get(["name", "id"])
            .where("email")
            .equals("test@test.com");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT name, id FROM person_by_email WHERE email = ?;");
        expect(params).toStrictEqual(["test@test.com"]);
    });

    it("Should find the correct query to execute - integration", async () => {

        const get = personSchema
            .get(["name", "id"])
            .where("first_name")
            .equals("test")
            .and("last_name")
            .equals("test");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT name, id FROM person_by_first_name_last_name WHERE first_name = ? AND last_name = ?;");
        expect(params).toStrictEqual(["test", "test"]);
    });

    it("Should create a query with the correct clustering columns", async () => {

        const get = personSchema
            .get()
            .where("id")
            .equals("123")
            .and("email")
            .equals("test@test.com");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_id WHERE id = ? AND email = ?;");
        expect(params).toStrictEqual(["123", "test@test.com"]);

    });


    it("Should create a query with the correct clustering columns", async () => {

        const get = queryById
            .get()
            .where("id")
            .equals("123")
            .and("email")
            .equals("test@test.com");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_id WHERE id = ? AND email = ?;");
        expect(params).toStrictEqual(["123", "test@test.com"]);

    });

    it("Should create a query with the correct clustering columns", async () => {

        const get = queryByEmail
            .get()
            .where("email")
            .equals("test@test.com")
            .and("id")
            .equals("123");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_email WHERE email = ? AND id = ?;");
        expect(params).toStrictEqual(["test@test.com", "123"]);

    });

    it("Should create a query with the correct clustering columns", async () => {

        const get = queryByfirstNameLastName
            .get()
            .where("first_name")
            .equals("test")
            .where("last_name")
            .equals("test")
            .and("email")
            .isGreaterThan("test");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_first_name_last_name WHERE first_name = ? AND last_name = ? AND email > ?;");
        expect(params).toStrictEqual(["test", "test", "test"]);
    });


    it("Should create a query with the correct clustering columns", async () => {

        const get = queryByfirstNameLastName
            .get()
            .where("first_name")
            .equals("test")
            .where("last_name")
            .equals("test")
            .and("email")
            .isGreaterThanOrEqualTo("test");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_first_name_last_name WHERE first_name = ? AND last_name = ? AND email >= ?;");
        expect(params).toStrictEqual(["test", "test", "test"]);

    });

    it("Should create a query with the correct clustering columns", async () => {

        const get = queryByfirstNameLastName
            .get()
            .where("first_name")
            .equals("test")
            .where("last_name")
            .equals("test")
            .and("email")
            .isLesserThanOrEqualTo("test");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_first_name_last_name WHERE first_name = ? AND last_name = ? AND email <= ?;");
        expect(params).toStrictEqual(["test", "test", "test"]);

    });

    it("Should create a query with the correct clustering columns", async () => {

        const get = queryByfirstNameLastName
            .get()
            .where("first_name")
            .equals("test")
            .where("last_name")
            .equals("test")
            .and("email")
            .isLesserThan("test");

        const { query, params } = get.getQuery();

        expect(query).toBe("SELECT * FROM person_by_first_name_last_name WHERE first_name = ? AND last_name = ? AND email < ?;");
        expect(params).toStrictEqual(["test", "test", "test"]);

    });




    it("should execute on a mock client", () => {

        // client.execute(query, params, { prepare: true });

        const client = new MockClient({
            contactPoints: ["test"],
            keyspace: "",

        });

        const get = queryByfirstNameLastName
            .get()
            .where("first_name")
            .equals("test")
            .where("last_name")
            .equals("test")
            .and("email")
            .isGreaterThan("test")
            .execute(client);

        expect(client.execute.mock.calls.length).toBe(1);
        expect(client.execute.mock.calls[0][0]).toBe("SELECT * FROM person_by_first_name_last_name WHERE first_name = ? AND last_name = ? AND email > ?;");
        expect(client.execute.mock.calls[0][1]).toStrictEqual(["test", "test", "test"]);
        expect(client.execute.mock.calls[0][2]).toStrictEqual({ prepare: true });


    });

});
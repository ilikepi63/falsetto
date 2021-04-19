import { Schema, Table, UuidAttribute, TextAttribute } from "../src";
import ClusteringColumn, { ClusteringDirection } from "../src/clustering-column";


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

        const query = personSchema
            .get(["name", "id"])
            .where("id")
            .equals("123")
            .and("email")
            .equals("test@test.com");

        expect(query.getQuery()).toBe("SELECT name, id FROM person_by_id WHERE id = 123 AND email = test@test.com;");

    });

    it("Should find the correct query to execute - integration", async () => {

        const query = personSchema
            .get(["name", "id"])
            .where("email")
            .equals("test@test.com");

        expect(query.getQuery()).toBe("SELECT name, id FROM person_by_email WHERE email = test@test.com;");

    });

    it("Should find the correct query to execute - integration", async () => {

        const query = personSchema
            .get(["name", "id"])
            .where("first_name")
            .equals("test")
            .and("last_name")
            .equals("test");

        expect(query.getQuery()).toBe("SELECT name, id FROM person_by_first_name_last_name WHERE first_name = test AND last_name = test;");

    });

    it("Should create a query with the correct clustering columns", async () => {

        const query = personSchema
            .get()
            .where("id")
            .equals("123")
            .and("email")
            .equals("test@test.com");

        expect(query.getQuery()).toBe("SELECT * FROM person_by_id WHERE id = 123 AND email = test@test.com;");

    });


    it("Should create a query with the correct clustering columns", async () => {

        const query = queryById
            .get()
            .where("id")
            .equals("123")
            .and("email")
            .equals("test@test.com");

        expect(query.getQuery()).toBe("SELECT * FROM person_by_id WHERE id = 123 AND email = test@test.com;");

    });

    it("Should create a query with the correct clustering columns", async () => {

        const query = queryByEmail
            .get()
            .where("email")
            .equals("test@test.com")
            .and("id")
            .equals("123");

        expect(query.getQuery()).toBe("SELECT * FROM person_by_email WHERE email = test@test.com AND id = 123;");

    });

    it("Should create a query with the correct clustering columns", async () => {

        const query = queryByfirstNameLastName
            .get()
            .where("first_name")
            .equals("test")
            .where("last_name")
            .equals("test")
            .and("email")
            .isGreaterThan("test");

        expect(query.getQuery()).toBe("SELECT * FROM person_by_first_name_last_name WHERE first_name = test AND last_name = test AND email > test;");

    });

});
import { Schema, Query, Table, UuidAttribute, TextAttribute } from "../src";
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

        // expect(query.getQuery()).toBe("SELECT * FROM x;");

    });

});
import { Schema, Table, TextAttribute, UuidAttribute } from "../src";

describe("Table Test Suite", () => {

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

    it("should make a table query", () => {

        const executable = queryByEmail.createTable();
        expect(executable).toBe("CREATE TABLE person_by_email (\nid uuid,\nfirst_name text,\nlast_name text,\nemail text,\nPRIMARY KEY ((email))\n) ;");
    });
});
import { Schema, Table, TextAttribute, UuidAttribute } from "../src";
import { generateSelectQuery, generateAttributes, stringFromAttributes, whereStatement } from "../src/cql-generators/select";


describe("Select Table Generator", () => {

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

    const queryByEmail = Table.from(personSchema).by(email);

    it("should just merge the entries", () => {
        expect(generateAttributes(["id", "name"])).toBe("id, name");
    });

    it("should just merge the entries", () => {
        expect(stringFromAttributes(["id", "name"])).toBe(generateAttributes(["id", "name"]));
    });

    it("should return all", () => {
        expect(stringFromAttributes()).toBe("*");
    });


    it("Should generate a standard SELECT Table", () => {
        expect(generateSelectQuery({ table: queryByEmail })).toBe("SELECT * FROM person_by_email;");
    });

    it("Should create a standard select statement with variables.", () => {
        expect(generateSelectQuery({ table: queryByEmail, attributes: ["id", "first_name"] })).toBe("SELECT id, first_name FROM person_by_email;");
    });

    it("Should create a standard select statement with variables and a where clause.", () => {
        expect(generateSelectQuery({
            table: queryByEmail, attributes: ["id", "first_name"], constraints: [
                { subject: "id", value: "123" }
            ]
        })).toBe("SELECT id, first_name FROM person_by_email WHERE id = 123;");
    });


    it("Should create a multi-constraint where clause.", () => {
        expect(generateSelectQuery({
            table: queryByEmail, attributes: ["id", "first_name"], constraints: [
                { subject: "id", value: "123" },
                { subject: "first_name", operator: "=", value: "test" }
            ]
        })).toBe("SELECT id, first_name FROM person_by_email WHERE id = 123 AND first_name = test;");
    });

    it("Should create a multi-constraint where clause.", () => {
        expect(generateSelectQuery({
            table: queryByEmail, attributes: ["id", "first_name"], constraints: [
                { subject: "id", value: "123" },
                { subject: "first_name", operator: "=", value: "test" },
                { subject: "age", operator: ">", value: "18" }
            ]
        })).toBe("SELECT id, first_name FROM person_by_email WHERE id = 123 AND first_name = test AND age > 18;");
    });

    it("Should create a standard where clause.", () => {
        expect(whereStatement(
            [
                { subject: "id", value: "123" }
            ])).toBe(" WHERE id = 123");
    });

});
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
        const { query, params } = generateSelectQuery({ table: queryByEmail });

        expect(query).toBe("SELECT * FROM person_by_email;");
        expect(params).toStrictEqual([]);
    });

    it("Should create a standard select statement with variables.", () => {
        const { query, params } = generateSelectQuery({ table: queryByEmail, attributes: ["id", "first_name"] });

        expect(query).toBe("SELECT id, first_name FROM person_by_email;");
        expect(params).toStrictEqual([]);
    });

    it("Should create a standard select statement with variables and a where clause.", () => {

        const { query, params } = generateSelectQuery({
            table: queryByEmail, attributes: ["id", "first_name"], constraints: [
                { subject: "id", value: "123" }
            ]
        });

        expect(query).toBe("SELECT id, first_name FROM person_by_email WHERE id = ?;");
        expect(params).toStrictEqual(["123"]);
    });


    it("Should create a multi-constraint where clause.", () => {

        const { query, params } = generateSelectQuery({
            table: queryByEmail, attributes: ["id", "first_name"], constraints: [
                { subject: "id", value: "123" },
                { subject: "first_name", operator: "=", value: "test" }
            ]
        });

        expect(query).toBe("SELECT id, first_name FROM person_by_email WHERE id = ? AND first_name = ?;");
        expect(params).toStrictEqual(["123", "test"]);
    });

    it("Should create a multi-constraint where clause.", () => {

        const { query, params } = generateSelectQuery({
            table: queryByEmail, attributes: ["id", "first_name"], constraints: [
                { subject: "id", value: "123" },
                { subject: "first_name", operator: "=", value: "test" },
                { subject: "age", operator: ">", value: "18" }
            ]
        });

        expect(query).toBe("SELECT id, first_name FROM person_by_email WHERE id = ? AND first_name = ? AND age > ?;");
        expect(params).toStrictEqual(["123", "test", "18"]);
    });

    it("Should create a standard where clause.", () => {

        const { query, params } = whereStatement([{ subject: "id", value: "123" }
        ]);

        expect(query).toBe(" WHERE id = ?");
        expect(params).toStrictEqual(["123"]);
    });

    it("Should create a standard where clause.", () => {

        const { query, params } = whereStatement([]);

        expect(query).toBe("");
        expect(params).toStrictEqual([]);
    });

    it("Should throw.", () => {


        expect(() => {
            const { query, params } = whereStatement([{ subject: "", value: null }]);
        }).toThrow();


    });


});
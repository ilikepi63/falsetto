import { Schema, Table, TextAttribute, UuidAttribute } from "../src";
import { generateSelectQuery, generateAttributes, stringFromAttributes } from "../src/cql-generators/select";


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

    const queryByEmail = Table.from(personSchema);

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

        // generateSelectQuery({});

    });

    it("Should throw an error if there is no table specified", () => {

        // expect(() => { generateSelectQuery({ table:  }); }).toThrow();

    });

});
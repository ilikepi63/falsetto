import { TextAttribute, UuidAttribute } from "../src/attributes";
import { timeStampOrTimeValue, createAssignment, createUpdateStatement } from "../src/cql-generators/update";
import Schema from "../src/schema";
import Table from "../src/table";

describe("Update Test Suite", () => {

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

    it("Should generate an empty string from no Timestamp values", () => {

        expect(timeStampOrTimeValue({})).toBe("");
    });

    it("Should generate correct Timestamp values", () => {

        expect(timeStampOrTimeValue({ timeValue: "100" })).toBe(" USING TTL 100");
    });

    it("Should generate the correct Timestamp values", () => {

        expect(timeStampOrTimeValue({ timestampValue: "100000000" })).toBe(" USING TIMESTAMP 100000000");
    });

    it("Should create the assignment with a single assignment operator", () => {

        const { query, params } = createAssignment({
            hello: "yes"
        });

        expect(query).toBe("hello = ?");

        expect(params).toStrictEqual(["yes"]);

    });

    it("Should create the assignment with a multi assignment operator", () => {
        const { query, params } = createAssignment({
            "hello": "yes",
            "goodbye": "no"
        });

        expect(query).toBe("hello = ?, goodbye = ?");

        expect(params).toStrictEqual(["yes", "no"]);

    });

    // UPDATE Movies SET col1 = val1, col2 = val2 WHERE movieID = key1;

    it("Should create a standard update statement", () => {

        const { query, params } = createUpdateStatement({
            table: queryByEmail, assignment: { "col1": "val1", "col2": "val2" }, constraints: [
                { subject: "movieId", value: "key1" }
            ]
        });

        expect(query).toBe("UPDATE person_by_email  SET col1 = ?, col2 = ?  WHERE movieId = ?;");

        expect(params).toStrictEqual(["val1", "val2", "key1"]);

    });

    // UPDATE Movies SET col1 = val1, col2 = val2 WHERE movieID = key1 IF NOT EXISTS;

    it("Should create a standard update statement", () => {

        const { query, params } = createUpdateStatement({
            table: queryByEmail, assignment: { "col1": "val1", "col2": "val2" }, ifNotExists: true, constraints: [
                { subject: "movieId", value: "key1" }
            ]
        });

        expect(query).toBe("UPDATE person_by_email  SET col1 = ?, col2 = ?  WHERE movieId = ? IF NOT EXISTS;");

        expect(params).toStrictEqual(["val1", "val2", "key1"]);

    });


    // UPDATE Movies SET col1 = val1, col2 = val2 WHERE movieID = key1 IF EXISTS;

    it("Should create a standard update statement", () => {

        const { query, params } = createUpdateStatement({
            table: queryByEmail, assignment: { "col1": "val1", "col2": "val2" }, ifExists: true, constraints: [
                { subject: "movieId", value: "key1" }
            ]
        });

        expect(query).toBe("UPDATE person_by_email  SET col1 = ?, col2 = ?  WHERE movieId = ? IF EXISTS;");

        expect(params).toStrictEqual(["val1", "val2", "key1"]);

    });


    // UPDATE Movies SET col1 = val1, col2 = val2 WHERE movieID = key1 IF condition1 = x;

    it("Should create a standard update statement", () => {

        const { query, params } = createUpdateStatement({
            table: queryByEmail, assignment: { "col1": "val1", "col2": "val2" }, conditions: [
                { subject: "condition1", value: "x" }
            ], constraints: [
                { subject: "movieId", value: "key1" }
            ]
        });

        expect(query).toBe("UPDATE person_by_email  SET col1 = ?, col2 = ?  WHERE movieId = ? IF condition1 = ?;");

        expect(params).toStrictEqual(["val1", "val2", "key1", "x"]);

    });


});
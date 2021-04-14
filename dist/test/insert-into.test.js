"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var clustering_column_1 = __importStar(require("../src/clustering-column"));
var insert_into_1 = require("../src/cql-generators/insert-into");
describe("Insert Into Test Suite", function () {
    var personId = new src_1.UuidAttribute("id");
    var firstName = new src_1.TextAttribute("first_name");
    var lastName = new src_1.TextAttribute("last_name");
    var email = new src_1.TextAttribute("email");
    var personSchema = new src_1.Schema("person", {
        id: personId,
        firstName: firstName,
        lastName: lastName,
        email: email
    });
    var queryByEmail = src_1.Query.from(personSchema)
        .by(email);
    var queryByfirstNameLastName = src_1.Query.from(personSchema)
        .by([firstName, lastName])
        .orderBy([new clustering_column_1.default({ name: email.name, direction: clustering_column_1.ClusteringDirection.asc })]);
    it("Should return a complete insert into query", function () {
        expect(insert_into_1.createInsertStatement(queryByEmail)).toBe("INSERT INTO person_by_email (id, first_name, last_name, email) VALUES (?, ?, ?, ?);");
        expect(insert_into_1.createInsertStatement(queryByfirstNameLastName)).toBe("INSERT INTO person_by_first_name_last_name (id, first_name, last_name, email) VALUES (?, ?, ?, ?);");
    });
    it("should return a valid list of attribute names", function () {
        expect(insert_into_1.createColumnList(queryByEmail)).toBe("(id, first_name, last_name, email)");
    });
    it("should return a correct prepared statement", function () {
        expect(insert_into_1.createPreparedStatement(queryByEmail)).toBe("(?, ?, ?, ?)");
    });
});

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
var create_table_1 = require("../src/cql-generators/create-table");
var utils_1 = require("../src/cql-generators/utils");
describe("Testing Create Table", function () {
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
    it("Should create a string version of an attribute", function () {
        expect(src_1.typeFromAttributeEntry(personId)).toBe("id uuid");
    });
    it("should result in the correct output attributes", function () {
        expect(src_1.attributesFromQuery(queryByEmail)).toBe("id uuid,\nfirst_name text,\nlast_name text,\nemail text");
    });
    it("should surround the string with parenthesis", function () {
        expect(src_1.parenthesis("Hello")).toBe("(Hello)");
    });
    it("Should correctly create the clustering keys", function () {
        expect(create_table_1.createClusteringKey(["key1", "key2"])).toBe("key1, key2");
    });
    it("Should correctly create the partition key", function () {
        expect(create_table_1.createPartitionKey(["key1", "key2"])).toBe("(key1, key2)");
    });
    it("Should correctly create the primary key", function () {
        expect(create_table_1.createPrimaryKey(queryByfirstNameLastName)).toBe("PRIMARY KEY ((first_name, last_name), email)");
    });
    it("Should create the clustering column correctly", function () {
        var column = new clustering_column_1.default({ direction: clustering_column_1.ClusteringDirection.asc, name: "added_date" });
        expect(create_table_1.createClusteringColumn(column)).toBe("added_date asc");
    });
    it("Should correctly create the clustering order", function () {
        var column1 = new clustering_column_1.default({ direction: clustering_column_1.ClusteringDirection.asc, name: "added_date" });
        var column2 = new clustering_column_1.default({ direction: clustering_column_1.ClusteringDirection.desc, name: "name" });
        expect(create_table_1.createClusteringOrder([column1, column2])).toBe("WITH CLUSTERING ORDER BY (added_date asc name desc)");
    });
    it("Should create the query name correctly", function () {
        expect(utils_1.createNameFromQuery(queryByEmail)).toBe("person_by_email");
    });
    it("Should create a table definition correctly", function () {
        console.log(queryByfirstNameLastName.partitionKey);
        expect(create_table_1.createTable(queryByfirstNameLastName)).toBe("CREATE TABLE person_by_first_name_last_name (\nid uuid,\nfirst_name text,\nlast_name text,\nemail text,\nPRIMARY KEY ((first_name, last_name), email)\n) WITH CLUSTERING ORDER BY (email asc);");
    });
});
describe("Create Partition Key", function () {
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
    var queryByEmail = src_1.Query.from(personSchema);
    it("should throw an error if the query does not have a partition key", function () {
        expect(function () {
            create_table_1.createPrimaryKey(queryByEmail);
        }).toThrowError(new TypeError("You cannot create a table with no primary key."));
    });
});

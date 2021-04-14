"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_table_1 = require("./cql-generators/create-table");
var Query = /** @class */ (function () {
    function Query(schema) {
        this.partitionKey = [];
        this.clusteringColumns = [];
        this.schema = schema;
        // check the environment variable when attaching this to a global function
        if (process.env.GENERATE_TABLES) {
            // add the query to the global query object
        }
    }
    Query.from = function (schema) {
        // create a new query instance
        var query = new Query(schema);
        // add the query to the schema instance
        schema.addQuery(query);
        // return the instance of this query
        return query;
    };
    Query.prototype.by = function (attr) {
        /// TODO: ensure that attributes are part of the actual schema
        if (Array.isArray(attr)) {
            for (var i = 0; i < attr.length; i++) {
                this.partitionKey.push(attr[i]);
            }
        }
        else {
            this.partitionKey.push(attr);
        }
        return this;
    };
    Query.prototype.orderBy = function (clusteringColumns) {
        this.clusteringColumns = clusteringColumns;
        return this;
    };
    Query.prototype.createTable = function () {
        return create_table_1.createTable(this);
    };
    return Query;
}());
exports.default = Query;

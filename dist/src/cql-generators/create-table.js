"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClusteringOrder = exports.createClusteringColumn = exports.createPartitionKey = exports.createClusteringKey = exports.createPrimaryKey = exports.attributesFromQuery = exports.typeFromAttributeEntry = exports.createTable = void 0;
var utils_1 = require("./utils");
// constants 
var CREATE_TABLE = "CREATE TABLE";
var PRIMARY_KEY = "PRIMARY KEY";
var WITH_CLUSTERING_ORDER_BY = "WITH CLUSTERING ORDER BY";
var createTable = function (query) { return CREATE_TABLE + " " + utils_1.createNameFromQuery(query) + " " + utils_1.parenthesis("\n" + exports.attributesFromQuery(query) + ",\n" + exports.createPrimaryKey(query) + "\n") + " " + exports.createClusteringOrder(query.clusteringColumns) + ";"; };
exports.createTable = createTable;
var typeFromAttributeEntry = function (attribute) { return attribute.name + " " + attribute.type; };
exports.typeFromAttributeEntry = typeFromAttributeEntry;
var attributesFromQuery = function (query) { return Object.entries(query.schema.attributes).map(function (_a) {
    var _b = __read(_a, 2), attribute = _b[1];
    return exports.typeFromAttributeEntry(attribute);
}).join(",\n"); };
exports.attributesFromQuery = attributesFromQuery;
var createPrimaryKey = function (query) {
    if (query.partitionKey.length < 1)
        throw new TypeError("You cannot create a table with no primary key.");
    if (query.clusteringColumns.length === 0) {
        return PRIMARY_KEY + " " + utils_1.parenthesis("" + exports.createPartitionKey(query.partitionKey.map(function (pkey) { return pkey.name; })));
    }
    var clusteringKey = exports.createClusteringKey(query.clusteringColumns.map(function (ckey) { return ckey.name; }));
    return PRIMARY_KEY + " " + utils_1.parenthesis(exports.createPartitionKey(query.partitionKey.map(function (pkey) { return pkey.name; })) + ", " + clusteringKey);
};
exports.createPrimaryKey = createPrimaryKey;
var createClusteringKey = function (keys) { return keys.join(", "); };
exports.createClusteringKey = createClusteringKey;
var createPartitionKey = function (keys) { return utils_1.parenthesis(keys.join(", ")); };
exports.createPartitionKey = createPartitionKey;
var createClusteringColumn = function (clusteringColumn) { return clusteringColumn.name + " " + clusteringColumn.direction; };
exports.createClusteringColumn = createClusteringColumn;
var createClusteringOrder = function (clusteringKeys) { return clusteringKeys.length > 0 ? WITH_CLUSTERING_ORDER_BY + " " + utils_1.parenthesis(clusteringKeys.map(function (col) { return exports.createClusteringColumn(col); }).join(" ")) : ""; };
exports.createClusteringOrder = createClusteringOrder;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClusteringOrder = exports.createClusteringColumn = exports.createPartitionKey = exports.createClusteringKey = exports.createPrimaryKey = exports.attributesFromQuery = exports.typeFromAttributeEntry = exports.createNameFromQuery = exports.parenthesis = exports.createTable = void 0;
// constants 
var CREATE_TABLE = "CREATE TABLE";
var PRIMARY_KEY = "PRIMARY KEY";
var WITH_CLUSTERING_ORDER_BY = "WITH CLUSTERING ORDER BY";
var createTable = function (query) { return CREATE_TABLE + " " + exports.createNameFromQuery(query) + " " + exports.parenthesis("\n" + exports.attributesFromQuery(query) + ",\n" + exports.createPrimaryKey(query) + "\n") + " " + exports.createClusteringOrder(query.clusteringColumns) + ";"; };
exports.createTable = createTable;
var parenthesis = function (input) { return "(" + input + ")"; };
exports.parenthesis = parenthesis;
var createNameFromQuery = function (query) { return query.schema.name + "_by_" + query.partitionKey.map(function (key) { return key.name; }).join("_"); };
exports.createNameFromQuery = createNameFromQuery;
// TODO: should probably fix the array typing here
var typeFromAttributeEntry = function (attribute) { return attribute.name + " " + attribute.type; };
exports.typeFromAttributeEntry = typeFromAttributeEntry;
var attributesFromQuery = function (query) { return Object.entries(query.schema.attributes).map(function (_a) {
    var attribute = _a[1];
    return exports.typeFromAttributeEntry(attribute);
}).join(",\n"); };
exports.attributesFromQuery = attributesFromQuery;
var createPrimaryKey = function (query) { return PRIMARY_KEY + " " + exports.parenthesis(exports.createPartitionKey(query.partitionKey.map(function (pkey) { return pkey.name; })) + ", " + exports.createClusteringKey(query.clusteringColumns.map(function (ckey) { return ckey.name; }))); };
exports.createPrimaryKey = createPrimaryKey;
var createClusteringKey = function (keys) { return keys.join(", "); };
exports.createClusteringKey = createClusteringKey;
var createPartitionKey = function (keys) { return exports.parenthesis(keys.join(", ")); };
exports.createPartitionKey = createPartitionKey;
var createClusteringColumn = function (clusteringColumn) { return clusteringColumn.name + " " + clusteringColumn.direction; };
exports.createClusteringColumn = createClusteringColumn;
var createClusteringOrder = function (clusteringKeys) { return clusteringKeys ? WITH_CLUSTERING_ORDER_BY + " " + exports.parenthesis(clusteringKeys.map(function (col) { return exports.createClusteringColumn(col); }).join(" ")) : ""; };
exports.createClusteringOrder = createClusteringOrder;

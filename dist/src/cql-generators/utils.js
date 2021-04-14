"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNameFromQuery = exports.parenthesis = void 0;
var parenthesis = function (input) { return "(" + input + ")"; };
exports.parenthesis = parenthesis;
var createNameFromQuery = function (query) { return query.schema.name + "_by_" + query.partitionKey.map(function (key) { return key.name; }).join("_"); };
exports.createNameFromQuery = createNameFromQuery;

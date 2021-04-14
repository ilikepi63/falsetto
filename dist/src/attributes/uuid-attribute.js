"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_types_1 = require("../data-types");
var UuidAttribute = /** @class */ (function () {
    function UuidAttribute(name) {
        this.type = data_types_1.CassandraType.uuid;
        this.name = name;
    }
    return UuidAttribute;
}());
exports.default = UuidAttribute;

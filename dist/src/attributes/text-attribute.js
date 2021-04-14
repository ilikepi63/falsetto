"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_types_1 = require("../data-types");
var TextAttribute = /** @class */ (function () {
    function TextAttribute(name) {
        this.type = data_types_1.CassandraType.text;
        this.name = name;
    }
    return TextAttribute;
}());
exports.default = TextAttribute;

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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreparedStatement = exports.createColumnList = exports.createInsertStatement = void 0;
var utils_1 = require("./utils");
var INSERT_INTO = "INSERT INTO";
var VALUES = "VALUES";
var createInsertStatement = function (query) { return INSERT_INTO + " " + utils_1.createNameFromQuery(query) + " " + exports.createColumnList(query) + " " + VALUES + " " + exports.createPreparedStatement(query) + ";"; };
exports.createInsertStatement = createInsertStatement;
var createColumnList = function (query) { return utils_1.parenthesis("" + Object.entries(query.schema.attributes).map(function (_a) {
    var _b = __read(_a, 2), attribute = _b[1];
    return attribute.name;
}).join(", ")); };
exports.createColumnList = createColumnList;
var createPreparedStatement = function (query) {
    var e_1, _a;
    var statement = "";
    try {
        for (var _b = __values(Object.entries(query.schema.attributes).entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), index = _d[0], _e = __read(_d[1], 2), value = _e[1];
            var addition = "?";
            if (!(index === (Object.keys(query.schema.attributes).length - 1)))
                addition = addition + ", ";
            statement = statement + addition;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return utils_1.parenthesis(statement);
};
exports.createPreparedStatement = createPreparedStatement;

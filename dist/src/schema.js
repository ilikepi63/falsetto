"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var single_executable_1 = __importDefault(require("./executables/single-executable"));
var create_table_1 = require("./cql-generators/create-table");
var multi_executable_1 = __importDefault(require("./executables/multi-executable"));
var insert_into_1 = require("./cql-generators/insert-into");
var batch_executable_1 = __importDefault(require("./executables/batch-executable"));
var Schema = /** @class */ (function () {
    function Schema(name, attributes) {
        this.queries = [];
        this.name = name;
        this.attributes = attributes;
    }
    Schema.prototype.addQuery = function (query) {
        this.queries.push(query);
        return this;
    };
    Schema.prototype.createTables = function () {
        //TODO: I am sure this is not the way I want to do this.
        var executables = this.queries
            .map(create_table_1.createTable)
            .map(function (statement) { return new single_executable_1.default(statement, []); });
        return new multi_executable_1.default(executables);
    };
    Schema.prototype.put = function (data) {
        var _this = this;
        var createArgsFromData = function (data) {
            var e_1, _a;
            var args = [];
            try {
                for (var _b = __values(Object.entries(_this.attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                    if (!data.hasOwnProperty(key))
                        throw new TypeError("Attribute " + key + " is empty. You can't insert null data.");
                    args.push(data[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return args;
        };
        if (this.queries.length === 0)
            throw new TypeError("Unable to put Schema without any queries.");
        if (this.queries.length === 1) {
            return new single_executable_1.default(insert_into_1.createInsertStatement(this.queries[0]), createArgsFromData(data));
        }
        return new batch_executable_1.default(this.queries.map(function (query) {
            return {
                query: insert_into_1.createInsertStatement(query),
                params: createArgsFromData(data)
            };
        }));
    };
    return Schema;
}());
exports.default = Schema;

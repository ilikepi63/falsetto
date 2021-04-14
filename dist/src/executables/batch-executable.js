"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BatchExecutable = /** @class */ (function () {
    function BatchExecutable(queries) {
        this.queries = queries;
    }
    BatchExecutable.prototype.execute = function (client) {
        return client.batch(this.queries, { prepare: true });
    };
    return BatchExecutable;
}());
exports.default = BatchExecutable;

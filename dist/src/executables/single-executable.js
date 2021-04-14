"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: there may be a better way to do this.
var SingleExecutable = /** @class */ (function () {
    function SingleExecutable(query, args) {
        this.query = query;
        this.args = args;
    }
    SingleExecutable.prototype.execute = function (client) {
        return client.execute(this.query, this.args, { prepare: true });
    };
    return SingleExecutable;
}());
exports.default = SingleExecutable;

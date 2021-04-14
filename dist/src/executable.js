"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: there may be a better way to do this.
var Executable = /** @class */ (function () {
    function Executable(query, args) {
        this.query = query;
        this.args = args;
    }
    Executable.prototype.execute = function (client) {
        return client.execute(this.query, this.args);
    };
    return Executable;
}());
exports.default = Executable;

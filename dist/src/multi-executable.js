"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: there may be a better way to do this.
var MultiExecutable = /** @class */ (function () {
    function MultiExecutable(executables) {
        this.executables = executables;
    }
    MultiExecutable.prototype.execute = function (client) {
        return Promise.all(this.executables.map(function (exec) { return exec.execute(client); }));
    };
    return MultiExecutable;
}());
exports.default = MultiExecutable;

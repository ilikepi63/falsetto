"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusteringDirection = void 0;
var ClusteringDirection;
(function (ClusteringDirection) {
    ClusteringDirection["asc"] = "asc";
    ClusteringDirection["desc"] = "desc";
})(ClusteringDirection = exports.ClusteringDirection || (exports.ClusteringDirection = {}));
var ClusteringColumn = /** @class */ (function () {
    function ClusteringColumn(_a) {
        var _b = _a.direction, direction = _b === void 0 ? ClusteringDirection.asc : _b, name = _a.name;
        this.direction = direction;
        this.name = name;
    }
    return ClusteringColumn;
}());
exports.default = ClusteringColumn;

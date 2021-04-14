"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAttribute = exports.UuidAttribute = void 0;
var uuid_attribute_1 = __importDefault(require("./uuid-attribute"));
exports.UuidAttribute = uuid_attribute_1.default;
var text_attribute_1 = __importDefault(require("./text-attribute"));
exports.TextAttribute = text_attribute_1.default;

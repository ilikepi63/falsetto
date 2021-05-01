import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class FloatAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.float;

    constructor(name: string) {
        this.name = name;
    }
}
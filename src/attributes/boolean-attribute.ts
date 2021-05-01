import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class BooleanAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.boolean;

    constructor(name: string) {
        this.name = name;
    }
}
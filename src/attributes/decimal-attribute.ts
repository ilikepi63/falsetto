import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class DecimalAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.decimal;

    constructor(name: string) {
        this.name = name;
    }
}
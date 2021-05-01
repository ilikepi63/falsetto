import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class BigIntAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.bigint;

    constructor(name: string) {
        this.name = name;
    }
}
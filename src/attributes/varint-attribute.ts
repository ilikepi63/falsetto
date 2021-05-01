import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class VarintAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.varint;

    constructor(name: string) {
        this.name = name;
    }
}
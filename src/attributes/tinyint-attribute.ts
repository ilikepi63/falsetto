import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class TinyintAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.tinyint;

    constructor(name: string) {
        this.name = name;
    }
}
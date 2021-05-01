import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class IntAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.int;

    constructor(name: string) {
        this.name = name;
    }
}
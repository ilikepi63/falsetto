import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class DoubleAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.double;

    constructor(name: string) {
        this.name = name;
    }
}
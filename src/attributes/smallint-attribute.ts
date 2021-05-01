import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class SmallIntAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.smallint;

    constructor(name: string) {
        this.name = name;
    }
}
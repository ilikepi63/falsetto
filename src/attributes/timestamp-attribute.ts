import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class TimestampAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.timestamp;

    constructor(name: string) {
        this.name = name;
    }
}
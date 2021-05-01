import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class DurationAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.duration;

    constructor(name: string) {
        this.name = name;
    }
}
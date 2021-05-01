import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class TimeAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.time;

    constructor(name: string) {
        this.name = name;
    }
}
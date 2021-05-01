import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class TimeuuidAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.timeuuid;

    constructor(name: string) {
        this.name = name;
    }
}
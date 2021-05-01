import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class DateAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.date;

    constructor(name: string) {
        this.name = name;
    }
}
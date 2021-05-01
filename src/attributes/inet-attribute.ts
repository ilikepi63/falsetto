import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class InetAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.inet;

    constructor(name: string) {
        this.name = name;
    }
}
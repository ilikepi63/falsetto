import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class VarcharAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.varchar;

    constructor(name: string) {
        this.name = name;
    }
}
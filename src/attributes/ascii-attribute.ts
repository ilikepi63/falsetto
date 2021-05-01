import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class AsciiAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.ascii;

    constructor(name: string) {
        this.name = name;
    }
}
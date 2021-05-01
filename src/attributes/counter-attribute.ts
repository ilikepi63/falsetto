import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class CounterAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.counter;

    constructor(name: string) {
        this.name = name;
    }
}
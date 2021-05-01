import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";

export default class BlobAttribute implements Attribute {
    name: string;
    type: CassandraType = CassandraType.blob;

    constructor(name: string) {
        this.name = name;
    }
}
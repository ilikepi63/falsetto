import Attribute from "./base-attribute";
import { CassandraType } from "../data-types";
export default class TextAttribute implements Attribute {
    name: string;
    type: CassandraType;
    constructor(name: string);
}

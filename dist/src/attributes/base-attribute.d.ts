import { CassandraType } from "../data-types";
export default interface Attribute {
    name: string;
    type: CassandraType;
}
export declare function isAttribute(object: any): object is Attribute;

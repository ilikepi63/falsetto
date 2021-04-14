import { CassandraType } from "../data-types";

export default interface Attribute {
    name: string;
    type: CassandraType;
};

export function isAttribute(object: any): object is Attribute {
    return true;
};
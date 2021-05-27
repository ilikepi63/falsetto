import { CassandraType } from "../data-types";

interface Attribute {
    name: string;
    type: string;
};

export function isAttribute(object: any): object is Attribute {
    return true;
};

export default Attribute;
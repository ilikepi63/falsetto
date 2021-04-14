import { Attribute } from "./attributes";
import Query from "./query";
import MultiExecutable from "./executables/multi-executable";
import Executable from "./executables/executable";
export default class Schema {
    private queries;
    attributes: Record<string, Attribute>;
    name: string;
    constructor(name: string, attributes: Record<string, Attribute>);
    addQuery(query: Query): Schema;
    createTables(): MultiExecutable;
    put(data: Record<string, any>): Executable;
}

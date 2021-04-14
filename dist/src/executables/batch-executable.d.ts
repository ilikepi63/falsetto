import { Client, types } from "cassandra-driver";
import Executable from "./executable";
export default class BatchExecutable implements Executable {
    queries: Array<any>;
    constructor(queries: Array<any>);
    execute(client: Client): Promise<types.ResultSet>;
}

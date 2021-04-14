import { Client, types } from "cassandra-driver";
import Executable from "./executable";

export default class BatchExecutable implements Executable {
    //TODO: fix the typing here
    queries: Array<any>;

    constructor(queries: Array<any>) {
        this.queries = queries;
    }


    execute(client: Client): Promise<types.ResultSet> {
        return client.batch(this.queries, { prepare: true });
    }
}
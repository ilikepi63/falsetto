import { Client, types } from "cassandra-driver";
import Executable from "./executable";

// TODO: there may be a better way to do this.
export default class SingleExecutable implements Executable {
    query: string;
    args: Array<string>;

    constructor(query: string, args: Array<string>) {
        this.query = query;
        this.args = args;
    }

    execute(client: Client): Promise<types.ResultSet> {
        return client.execute(this.query, this.args, { prepare: true });
    }
}


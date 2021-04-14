import { Client, types } from "cassandra-driver";
export default class Executable {
    query: string;
    args: Array<string>;
    constructor(query: string, args: Array<string>);
    execute(client: Client): Promise<types.ResultSet>;
}

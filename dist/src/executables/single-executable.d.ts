import { Client, types } from "cassandra-driver";
import Executable from "./executable";
export default class SingleExecutable implements Executable {
    query: string;
    args: Array<string>;
    constructor(query: string, args: Array<string>);
    execute(client: Client): Promise<types.ResultSet>;
}

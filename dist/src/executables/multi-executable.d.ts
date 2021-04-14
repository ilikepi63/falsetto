import { Client, types } from "cassandra-driver";
import Executable from "./executable";
import SingleExecutable from "./single-executable";
export default class MultiExecutable implements Executable {
    executables: Array<SingleExecutable>;
    constructor(executables: Array<SingleExecutable>);
    execute(client: Client): Promise<Array<types.ResultSet>>;
}

import { Client, types } from "cassandra-driver";
import Executable from "./executable";
export default class MultiExecutable {
    executables: Array<Executable>;
    constructor(executables: Array<Executable>);
    execute(client: Client): Promise<Array<types.ResultSet>>;
}

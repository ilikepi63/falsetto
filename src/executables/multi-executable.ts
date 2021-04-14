import { Client, types } from "cassandra-driver";
import Executable from "./executable";
import SingleExecutable from "./single-executable";


// TODO: there may be a better way to do this.
export default class MultiExecutable implements Executable {
    executables: Array<SingleExecutable>;

    constructor(executables: Array<SingleExecutable>) {
        this.executables = executables;
    }

    execute(client: Client): Promise<Array<types.ResultSet>> {
        return Promise.all(this.executables.map(exec => exec.execute(client)));
    }
}
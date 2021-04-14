import { Client, types } from "cassandra-driver";

type ExecuteFunction = (client: Client) => Promise<types.ResultSet> | Promise<Array<types.ResultSet>>;

export default interface Executable {
    execute: ExecuteFunction;
};;;;;;;;;;;;
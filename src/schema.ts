import { Attribute, UuidAttribute } from "./attributes";
import Table from "./table";
import SingleExecutable from "./executables/single-executable";
import { createTable } from "./cql-generators/create-table";
import MultiExecutable from "./executables/multi-executable";
import { createTableBatchFromQueries } from "./cql-generators/batch";
import { createInsertStatement } from "./cql-generators/insert-into";
import BatchExecutable from "./executables/batch-executable";
import Executable from "./executables/executable";

export default class Schema {

    private queries: Array<Table> = [];

    attributes: Record<string, Attribute>;
    name: string;

    constructor(name: string, attributes: Record<string, Attribute>) {
        this.name = name;
        this.attributes = attributes;
    }

    addTable(query: Table): Schema {
        this.queries.push(query);
        return this;
    }

    createTables(): MultiExecutable {

        //TODO: I am sure this is not the way I want to do this.
        const executables: Array<SingleExecutable> = this.queries
            .map(createTable)
            .map(statement => new SingleExecutable(statement, []));

        return new MultiExecutable(executables);
    }

    get(data: Record<string, any>): Executable {

        const query: string = "";

        const args: Array<string> = [];

        return new SingleExecutable(query, args);
    }

    put(data: Record<string, any>): Executable {

        const createArgsFromData = (data: Record<string, any>) => {

            let args = [];

            for (const [key, value] of Object.entries(this.attributes)) {
                if (!data.hasOwnProperty(key)) throw new TypeError(`Attribute ${key} is empty. You can't insert null data.`);
                args.push(data[key]);
            }

            return args;

        };

        if (this.queries.length === 0) throw new TypeError("Unable to put Schema without any queries.");

        if (this.queries.length === 1) {
            return new SingleExecutable(createInsertStatement(this.queries[0]), createArgsFromData(data));
        }

        return new BatchExecutable(this.queries.map(query => {
            return {
                query: createInsertStatement(query),
                params: createArgsFromData(data)
            };
        }));
    }

}
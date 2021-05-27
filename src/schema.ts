import { Attribute } from "./attributes";
import Table from "./table";
import SingleExecutable from "./executables/single-executable";
import { createTable } from "./cql-generators/create-table";
import MultiExecutable from "./executables/multi-executable";
import { createInsertStatement, InsertStatementOptions } from "./cql-generators/insert-into";
import BatchExecutable from "./executables/batch-executable";
import Executable from "./executables/executable";
import Query from "./query";
import Update from "./update";


export default class Schema {

    tables: Array<Table> = [];

    attributes: Record<string, Attribute>;
    name: string;

    constructor(name: string, attributes: Record<string, Attribute>) {
        this.name = name;
        this.attributes = attributes;
    }

    addTable(query: Table): Schema {
        this.tables.push(query);
        return this;
    }

    createTables(): MultiExecutable {

        //TODO: I am sure this is not the way I want to do this.
        const executables: Array<SingleExecutable> = this.tables
            .map(createTable)
            .map(statement => new SingleExecutable(statement, []));

        return new MultiExecutable(executables);
    }

    update(): Update {
        return new Update({ schema: this });
    };

    get(attributes?: Array<string>): Query {
        return new Query({ schema: this, attributes });
    }

    put(data: Record<string, any>, opts: InsertStatementOptions = {}): Executable {

        const createArgsFromData = (data: Record<string, any>) => {

            let args = [];

            for (const [key, value] of Object.entries(this.attributes)) {
                if (!data.hasOwnProperty(key)) throw new TypeError(`Attribute ${key} is empty. You can't insert null data.`);
                args.push(data[key]);
            }

            return args;

        };

        if (this.tables.length === 0) throw new TypeError("Unable to put Schema without any queries.");

        if (this.tables.length === 1) {
            return new SingleExecutable(createInsertStatement(this.tables[0]), createArgsFromData(data));
        }

        return new BatchExecutable(this.tables.map(table => {
            return {
                query: createInsertStatement(table, opts),
                params: createArgsFromData(data)
            };
        }));
    }

}
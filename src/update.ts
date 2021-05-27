import { createUpdateStatement } from "./cql-generators/update";
import { IConstraint } from "./cql-generators/utils";
import Schema from "./schema";
import Table from "./table";
import { Where } from "./where";

type IUpdateConstructor = {
    table: Table,
    schema?: Schema
};

export default class Update {

    // { table, assignment, constraints, ifExists, ifNotExists, conditions, timeValue, timestampValue }

    constraints: Array<IConstraint>;
    conditions: Array<IConstraint>;
    table: Table;
    // Schemas will come at a later stage
    // schema?: Schema;
    assignment: Record<string, unknown>;
    ifExistsBoolean?: boolean;
    ifNotExistsBoolean?: boolean;
    timeValue?: number;
    timestampValue?: number;

    constructor({ table }: IUpdateConstructor) {
        // if (!table && !schema) throw new TypeError("You cannot create a query without a table or schema. Please specify atleast one.");
        this.table = table;
        // this.schema = schema;
        this.constraints = [];
        this.conditions = [];
        this.assignment = {};
    }

    addConstraint(constraint: IConstraint) {
        this.constraints.push(constraint);
    }

    where(attribute: string): Where<Update> {
        return new Where(this, attribute);
    };

    and(attribute: string): Where<Update> {
        return new Where(this, attribute);
    };

    if(attribute: string): Where<Update> {
        return new Where(this, attribute);
    }

    ifExists() {
        this.ifExistsBoolean = true;
    }

    ifNotExists() {
        this.ifNotExistsBoolean = true;
    }

    usingTimeStamp(timestamp: number) {
        this.timestampValue = timestamp;
        return this;
    }

    usingTTL(timeValue: number) {
        this.timeValue = timeValue;
        return this;
    }

    getStatement() {

        return createUpdateStatement({
            table: this.table,
            assignment: this.assignment,
            constraints: this.constraints,
            conditions: this.conditions,
            ifExists: this.ifExistsBoolean,
            ifNotExists: this.ifNotExistsBoolean,
            timeValue: this.timeValue,
            timestampValue: this.timestampValue
        });
    }

}


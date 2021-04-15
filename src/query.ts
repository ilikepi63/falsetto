import Executable from "./executables/executable";
import { Client, types } from "cassandra-driver";
import { generateSelectQuery, IConstraint } from "./cql-generators/select";
import { Schema, Table } from ".";

interface IQueryConstructor {
    table?: Table,
    schema?: Schema,
    attributes?: Array<string>
}

export default class Query implements Executable {

    constraints: Array<IConstraint>;
    attributes?: Array<string>;
    table?: Table;

    constructor({ table, schema, attributes }: IQueryConstructor) {
        if (!table && !schema) throw new TypeError("You cannot create a query without a table or schema. Please specify atleast one.");
        this.table = table;
        this.constraints = [];
        this.attributes = attributes;
    }

    where(attribute: string): Where {
        return new Where(this, attribute);
    };

    and(attribute: string): Where {
        return new Where(this, attribute);
    };

    addConstraint(constraint: IConstraint) {
        this.constraints.push(constraint);
    }

    getTable(): Table {
        // if we do not have table specified, that means that we have a schema specified
        // therefore we will use an algorithm to get 
        if (!this.table) {

        }

        return this.table as Table;
    }

    getQuery() {
        return generateSelectQuery({ table: this.getTable(), attributes: this.attributes, constraints: this.constraints });
    }

    execute(client: Client): Promise<types.ResultSet> {
        return client.execute(this.getQuery());
    }
}

export class Where {

    EQUALS: string = "=";
    IS_GREATER_THAN: string = ">";
    IS_GREATER_THAN_OR_EQUAL_TO: string = ">=";
    IS_LESSER_THAN: string = "<";
    IS_LESSER_THAN_OR_EQUAL_TO: string = "<=";

    query: Query;
    attribute: string;

    constructor(query: Query, attribute: string) {
        this.query = query;
        this.attribute = attribute;
    }

    equals(value: unknown): Query {
        this.query.addConstraint({ subject: this.attribute, operator: this.EQUALS, value: value });
        return this.query;
    }

    isGreaterThan(value: unknown): Query {
        this.query.addConstraint({ subject: this.attribute, operator: this.IS_GREATER_THAN, value: value });
        return this.query;
    }

    isGreaterThanOrEqualTo(value: unknown) {
        this.query.addConstraint({ subject: this.attribute, operator: this.IS_GREATER_THAN_OR_EQUAL_TO, value: value });
        return this.query;
    }

    isLesserThan(value: unknown) {
        this.query.addConstraint({ subject: this.attribute, operator: this.IS_LESSER_THAN, value: value });
        return this.query;
    }

    isLesserThanOrEqualTo(value: unknown) {
        this.query.addConstraint({ subject: this.attribute, operator: this.IS_LESSER_THAN_OR_EQUAL_TO, value: value });
        return this.query;
    }

}
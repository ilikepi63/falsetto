import Executable from "./executables/executable";
import { Client, types } from "cassandra-driver";
import { generateSelectQuery } from "./cql-generators/select";
import { Schema, Table } from ".";
import { getTableFromSchema } from "./schema-utils";
import { IConstraint } from "./cql-generators/utils";

interface IQueryConstructor {
    table?: Table,
    schema?: Schema,
    attributes?: Array<string>
}

export default class Query implements Executable {

    constraints: Array<IConstraint>;
    attributes?: Array<string>;
    table?: Table;
    schema?: Schema;

    constructor({ table, schema, attributes }: IQueryConstructor) {
        if (!table && !schema) throw new TypeError("You cannot create a query without a table or schema. Please specify atleast one.");
        this.table = table;
        this.schema = schema;
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
            return getTableFromSchema(getEqualConstraints(this.constraints).map((constraint) => constraint.subject), this.constraints.map(constraint => constraint.subject), this.schema as Schema);
        }

        return this.table as Table;
    }

    getQuery() {
        return generateSelectQuery({ table: this.getTable(), attributes: this.attributes, constraints: this.constraints });
    }

    execute(client: Client): Promise<types.ResultSet> {

        const { query, params } = this.getQuery();

        return client.execute(query, params, { prepare: true });
    }
}

export const getEqualConstraints = (constraints: Array<IConstraint>): Array<IConstraint> => constraints.filter(constraint => constraint.operator === Where.EQUALS);

export class Where {

    static EQUALS: string = "=";
    static IS_GREATER_THAN: string = ">";
    static IS_GREATER_THAN_OR_EQUAL_TO: string = ">=";
    static IS_LESSER_THAN: string = "<";
    static IS_LESSER_THAN_OR_EQUAL_TO: string = "<=";

    query: Query;
    attribute: string;

    constructor(query: Query, attribute: string) {
        this.query = query;
        this.attribute = attribute;
    }

    equals(value: unknown): Query {
        this.query.addConstraint({ subject: this.attribute, operator: Where.EQUALS, value: value });
        return this.query;
    }

    isGreaterThan(value: unknown): Query {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_GREATER_THAN, value: value });
        return this.query;
    }

    isGreaterThanOrEqualTo(value: unknown) {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_GREATER_THAN_OR_EQUAL_TO, value: value });
        return this.query;
    }

    isLesserThan(value: unknown) {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_LESSER_THAN, value: value });
        return this.query;
    }

    isLesserThanOrEqualTo(value: unknown) {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_LESSER_THAN_OR_EQUAL_TO, value: value });
        return this.query;
    }

}
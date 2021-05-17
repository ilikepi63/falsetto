// INSERT INTO[keyspace_name.] table_name(column_list)
// VALUES(column_values)
import { Table } from "..";
import { createNameFromQuery, parenthesis } from "./utils";

const INSERT_INTO = "INSERT INTO";
const VALUES = "VALUES";

export interface InsertStatementOptions {
    ifNotExists?: boolean
}

export const createInsertStatement = (query: Table, opts: InsertStatementOptions = {}): string => `${INSERT_INTO} ${createNameFromQuery(query)} ${createColumnList(query)} ${VALUES} ${createPreparedStatement(query)}${casStatement(opts.ifNotExists)};`;

export const casStatement = (isSet?: boolean) => {
    if (isSet) return " IF NOT EXISTS";

    return "";
};

export const createColumnList = (query: Table): string => parenthesis(`${Object.entries(query.schema.attributes).map(([, attribute]) => attribute.name).join(", ")}`);

export const createPreparedStatement = (query: Table): string => {

    let statement = "";

    for (const [index, [, value]] of Object.entries(query.schema.attributes).entries()) {

        let addition = "?";

        if (!(index === (Object.keys(query.schema.attributes).length - 1))) addition = addition + ", ";

        statement = statement + addition;

    }

    return parenthesis(statement);
};
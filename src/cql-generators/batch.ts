import { Table } from "..";
import { createTable } from "./create-table";
import { createInsertStatement } from "./insert-into";

const BEGIN_BATCH = "BEGIN BATCH";
const APPLY_BATCH = "APPLY_BATCH";

export const makeBatchFromStatements = (statements: Array<string>): string => `${BEGIN_BATCH} \n ${statements.join("\n")} \n ${APPLY_BATCH}`;

export const createTableBatchFromQueries = (queries: Array<Table>): string => makeBatchFromStatements(queries.map(createTable));

export const insertIntoBatchFromQueries = (queries: Array<Table>): string => makeBatchFromStatements(queries.map(createInsertStatement));
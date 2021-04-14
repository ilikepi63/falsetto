import { Query } from "..";
export declare const makeBatchFromStatements: (statements: Array<string>) => string;
export declare const createTableBatchFromQueries: (queries: Array<Query>) => string;
export declare const insertIntoBatchFromQueries: (queries: Array<Query>) => string;

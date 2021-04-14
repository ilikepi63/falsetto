import { Table } from "..";

export const parenthesis = (input: string): string => `(${input})`;
export const createNameFromQuery = (query: Table): string => `${query.schema.name}_by_${query.partitionKey.map(key => key.name).join("_")}`;
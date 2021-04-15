import Schema from "./schema";
import Table from "./table";
import { NoViableTablesError } from "./errors";
import ClusteringColumn from "./clustering-column";

/** Function to retrieve the first-most query that 
 * can support the schema. 
 * 
 * @param keys - keys the query uses.
 * @param schema - the schema given
 */
export const getTableFromSchema = (exactKeys: Array<string>, rangeKeys: Array<string>, schema: Schema) => {

    const viableTables = schema.tables.filter(partitionDoesMatch(exactKeys));

    // if none were found, throw.
    if (viableTables.length < 1) throw new NoViableTablesError();

    // if there are no range keys, then we just return the first viable table
    if (rangeKeys.length < 1) return viableTables[0];

    getBestFitTable(viableTables, rangeKeys);

};

/** For a query to be a viable solution to the keys, they must match the partition 
 *  
 * @param schema 
 * @param keys 
 */
export const partitionDoesMatch = (keys: Array<string>) => (table: Table): boolean => table.partitionKey.map(attr => attr.name).every(key => keys.includes(key));


const getPoint = (keys: Array<string>) => (col: ClusteringColumn): number => keys.includes(col.name) ? 1 : 0;

export const getBestFitTable = (tables: Array<Table>, rangeKeys: Array<string>): Table => {

    let bestFit: Table = tables[0];
    let currentBestFitScore = 0;


    for (let i = 0; i < tables.length; i++) {

        const clusteringColumns: Array<ClusteringColumn> = tables.flatMap(table => table.clusteringColumns);

        const score: number = clusteringColumns.map(getPoint(rangeKeys)).reduce((sum, arr) => sum + arr, 0);

        if (score > currentBestFitScore) {
            bestFit = tables[i];
            currentBestFitScore = score;
        }

    }

    return bestFit;

};
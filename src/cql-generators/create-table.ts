import { Attribute } from "../attributes";
import ClusteringColumn from "../clustering-column";
import Table from "../table";
import { parenthesis, createNameFromQuery } from "./utils";

// constants 
const CREATE_TABLE = "CREATE TABLE";
const PRIMARY_KEY = "PRIMARY KEY";
const WITH_CLUSTERING_ORDER_BY = "WITH CLUSTERING ORDER BY";

export const createTable = (query: Table): string => `${CREATE_TABLE} ${createNameFromQuery(query)} ${parenthesis(`\n${attributesFromQuery(query)},\n${createPrimaryKey(query)}\n`)} ${createClusteringOrder(query.clusteringColumns)};`;

export const typeFromAttributeEntry = (attribute: Attribute): string => `${attribute.name} ${attribute.type}`;

export const attributesFromQuery = (query: Table): string => Object.entries(query.schema.attributes).map(([, attribute]) => typeFromAttributeEntry(attribute)).join(",\n");

export const createPrimaryKey = (query: Table): string => {

    if (query.partitionKey.length < 1) throw new TypeError("You cannot create a table with no primary key.");

    if (query.clusteringColumns.length === 0) {
        return `${PRIMARY_KEY} ${parenthesis(`${createPartitionKey(query.partitionKey.map(pkey => pkey.name))}`)}`;
    }

    const clusteringKey = createClusteringKey(query.clusteringColumns.map(ckey => ckey.name));

    return `${PRIMARY_KEY} ${parenthesis(`${createPartitionKey(query.partitionKey.map(pkey => pkey.name))}, ${clusteringKey}`)}`;
};
export const createClusteringKey = (keys: Array<string>): string => keys.join(", ");

export const createPartitionKey = (keys: Array<string>): string => parenthesis(keys.join(", "));

export const createClusteringColumn = (clusteringColumn: ClusteringColumn): string => `${clusteringColumn.name} ${clusteringColumn.direction}`;

export const createClusteringOrder = (clusteringKeys: Array<ClusteringColumn>): string => clusteringKeys.length > 0 ? `${WITH_CLUSTERING_ORDER_BY} ${parenthesis(clusteringKeys.map(col => createClusteringColumn(col)).join(", "))}` : "";
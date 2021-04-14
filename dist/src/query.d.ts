import Schema from "./schema";
import { Attribute } from "./attributes";
import ClusteringColumn from "./clustering-column";
export default class Query {
    schema: Schema;
    partitionKey: Array<Attribute>;
    clusteringColumns: Array<ClusteringColumn>;
    private constructor();
    static from(schema: Schema): Query;
    by(attr: Attribute | Array<Attribute>): Query;
    orderBy(clusteringColumns: Array<ClusteringColumn>): Query;
    createTable(): string;
}

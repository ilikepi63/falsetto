import Schema from "./schema";
import { Attribute } from "./attributes";
import ClusteringColumn from "./clustering-column";
import { createTable } from "./cql-generators/create-table";
import { isAttribute } from "./attributes/base-attribute";
import Query from "./query";

export default class Table {

    schema: Schema;
    partitionKey: Array<Attribute> = [];
    clusteringColumns: Array<ClusteringColumn> = [];

    private constructor(schema: Schema) {
        this.schema = schema;

        // check the environment variable when attaching this to a global function
        if (process.env.GENERATE_TABLES) {
            // add the query to the global query object
        }
    }

    static from(schema: Schema): Table {

        // create a new query instance
        const query = new Table(schema);

        // add the query to the schema instance
        schema.addTable(query);

        // return the instance of this query
        return query;
    }

    by(attr: Attribute | Array<Attribute>): Table {

        /// TODO: ensure that attributes are part of the actual schema

        if (Array.isArray(attr)) {
            for (let i = 0; i < attr.length; i++) {
                this.partitionKey.push(attr[i]);
            }
        } else {
            this.partitionKey.push(attr);
        }

        return this;
    }

    orderBy(clusteringColumns: Array<ClusteringColumn>): Table {

        this.clusteringColumns = clusteringColumns;

        return this;

    }

    createTable(): string {
        return createTable(this);
    }


    get(attributes?: Array<string>): Query {
        return new Query({ table: this, attributes });
    }
}



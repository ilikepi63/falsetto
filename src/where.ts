import { IConstraint } from "./cql-generators/utils";
import Query from "./query";

type QueryType = {
    addConstraint: (constraint: IConstraint) => void
}

export class Where<T extends QueryType> {

    static EQUALS: string = "=";
    static IS_GREATER_THAN: string = ">";
    static IS_GREATER_THAN_OR_EQUAL_TO: string = ">=";
    static IS_LESSER_THAN: string = "<";
    static IS_LESSER_THAN_OR_EQUAL_TO: string = "<=";

    query: T;
    attribute: string;

    constructor(query: T, attribute: string) {
        this.query = query;
        this.attribute = attribute;
    }

    equals(value: unknown): T {
        this.query.addConstraint({ subject: this.attribute, operator: Where.EQUALS, value: value });
        return this.query;
    }

    isGreaterThan(value: unknown): T {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_GREATER_THAN, value: value });
        return this.query;
    }

    isGreaterThanOrEqualTo(value: unknown): T {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_GREATER_THAN_OR_EQUAL_TO, value: value });
        return this.query;
    }

    isLesserThan(value: unknown): T {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_LESSER_THAN, value: value });
        return this.query;
    }

    isLesserThanOrEqualTo(value: unknown): T {
        this.query.addConstraint({ subject: this.attribute, operator: Where.IS_LESSER_THAN_OR_EQUAL_TO, value: value });
        return this.query;
    }

}
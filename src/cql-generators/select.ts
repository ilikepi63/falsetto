import Table from "../table";
import { createNameFromQuery, IConstraint, ISelectStatement, whereStatement } from "./utils";

export const SELECT = "SELECT";
export const FROM = "FROM";

export interface IQuery {
    table: Table,
    attributes?: Array<string>,
    constraints?: Array<IConstraint>
};

export const generateAttributes = (arr: Array<string>): string => arr.join(", ");

export const stringFromAttributes = (arr: Array<string> | void): string => {

    // the idea is that you do not get 
    if (arr === null || arr === undefined) {
        return "*";
    }

    return generateAttributes(arr);
};


export const generateSelectQuery = ({ table, attributes, constraints }: IQuery): ISelectStatement => {

    const { params, query } = whereStatement(constraints);

    return {
        params,
        query: `${SELECT} ${stringFromAttributes(attributes)} ${FROM} ${createNameFromQuery(table)}${query};`
    };

};

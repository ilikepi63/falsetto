import Table from "../table";
import { isString } from "../utils";
import { createNameFromQuery } from "./utils";

export const SELECT = "SELECT";
export const FROM = "FROM";
export const WHERE = "WHERE";
export const AND = "AND";

export interface IConstraint {
    subject: string;
    operator?: string;
    value: unknown;
}

export interface IQuery {
    table: Table,
    attributes?: Array<string>,
    constraints?: Array<IConstraint>
};

export interface ISelectStatement {
    params: Array<any>,
    query: string
}

export const generateAttributes = (arr: Array<string>): string => arr.join(", ");

export const stringFromAttributes = (arr: Array<string> | void): string => {

    // the idea is that you do not get 
    if (arr === null || arr === undefined) {
        return "*";
    }

    return generateAttributes(arr);
};


export const getResultantConstraint = (constraint: IConstraint) => {
    if (isString(constraint.subject) && isString(constraint.operator) && isString(constraint.value)) {
        return `${constraint.subject} ${constraint.operator} ?`;
    }

    if (isString(constraint.subject) && isString(constraint.value)) {
        return `${constraint.subject} = ?`;
    }

    throw new TypeError(`Malformed Input when constructing a IConstraint object. Given: ${constraint}.`);
};

export const getWhereFromConstraints = (constraints: Array<IConstraint>): ISelectStatement => {
    let query = " ";
    let params = [];

    for (let i = 0; i < constraints.length; i++) {
        params.push(constraints[i].value);
        if (i === 0) {
            query = query + `${WHERE} ${getResultantConstraint(constraints[i])}`;
        } else {
            query = query + ` ${AND} ${getResultantConstraint(constraints[i])}`;
        }

    }

    return {
        query,
        params
    };
};

export const whereStatement = (constraints?: Array<IConstraint>): ISelectStatement => {

    if (!constraints) return { query: "", params: [] };

    if (constraints.length < 1) return { query: "", params: [] };

    return getWhereFromConstraints(constraints);

};

export const generateSelectQuery = ({ table, attributes, constraints }: IQuery): ISelectStatement => {

    const { params, query } = whereStatement(constraints);

    return {
        params,
        query: `${SELECT} ${stringFromAttributes(attributes)} ${FROM} ${createNameFromQuery(table)}${query};`
    };

};

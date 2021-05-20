import { Table } from "..";
import { isString } from "../utils";

export const parenthesis = (input: string): string => `(${input})`;
export const createNameFromQuery = (query: Table): string => `${query.schema.name}_by_${query.partitionKey.map(key => key.name).join("_")}`;

export const WHERE = "WHERE";
export const AND = "AND";

export interface IConstraint {
    subject: string;
    operator?: string;
    value: unknown;
}

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

export const getResultantConstraint = (constraint: IConstraint) => {
    if (isString(constraint.subject) && isString(constraint.operator) && isString(constraint.value)) {
        return `${constraint.subject} ${constraint.operator} ?`;
    }

    if (isString(constraint.subject) && isString(constraint.value)) {
        return `${constraint.subject} = ?`;
    }

    throw new TypeError(`Malformed Input when constructing a IConstraint object. Given: ${constraint}.`);
};

export interface ISelectStatement {
    params: Array<any>,
    query: string
}

export const isObject = (val: unknown) => typeof val === "object" && !Array.isArray(val);

export const isSelectStatement = (val: unknown): boolean => {

    const objectVal = val as { hasOwnProperty: (param: string) => boolean };

    const result = isObject(objectVal) && !Array.isArray(objectVal) && objectVal.hasOwnProperty && objectVal.hasOwnProperty("query") && objectVal.hasOwnProperty("params");

    return result;

};
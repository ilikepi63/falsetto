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



export const generateAttributes = (arr: Array<string>): string => arr.join(", ");

export const stringFromAttributes = (arr: Array<string> | void): string => {

    // the idea is that you do not get 
    if (arr === null || arr === undefined) {
        return "*";
    }

    return generateAttributes(arr);
};


export const getResultantIConstraint = (constraint: IConstraint) => {
    if (isString(constraint.subject) && isString(constraint.operator) && isString(constraint.value)) {
        return `${constraint.subject} ${constraint.operator} ${constraint.value}`;
    }

    if (isString(constraint.subject) && isString(constraint.value)) {
        return `${constraint.subject} = ${constraint.value}`;
    }

    throw new TypeError(`Malformed Input when constructing a IConstraint object. Given: ${constraint}.`);
};

export const whereStatement = (constraints?: Array<IConstraint>) => {

    if (!constraints) return "";

    if (constraints.length < 1) return "";

    return ` ${WHERE} ${constraints.map(getResultantIConstraint).join(` ${AND} `)}`;

};

export const generateSelectQuery = ({ table, attributes, constraints }: IQuery): string => `${SELECT} ${stringFromAttributes(attributes)} ${FROM} ${createNameFromQuery(table)}${whereStatement(constraints)};`;

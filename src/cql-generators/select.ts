import Table from "../table";
import { isString } from "../utils";
import { createNameFromQuery } from "./utils";

export const SELECT = "SELECT";
export const FROM = "FROM";
export const WHERE = "WHERE";
export const AND = "AND";

interface Constraint {
    subject: string;
    operator: string;
    value?: string;
}

interface IQuery {
    table: Table,
    attributes?: Array<string>,
    constraints?: Array<Constraint>
};

export const generateAttributes = (arr: Array<string>): string => arr.join(", ");

export const stringFromAttributes = (arr: Array<string> | void): string => {

    // the idea is that you do not get 
    if (arr === null || arr === undefined) {
        return "*";
    }

    return generateAttributes(arr);
};

export const whereClause = (attribs: Array<string>) => {
    if (attribs.length < 1) return "";

    return `${WHERE} `;
};

export const getResultantConstraint = (constraint: Constraint) => {
    if (isString(constraint.subject) && isString(constraint.operator) && isString(constraint.value)) {
        return `${constraint.subject} ${constraint.operator} ${constraint.value}`;
    }

    if (isString(constraint.subject) && isString(constraint.value)) {
        return `${constraint.subject} = ${constraint.value}`;
    }

    throw new TypeError(`Malformed Input when constructing a Constraint object. Given: ${constraint}.`);
};

export const constraintToString = (constraint: Constraint) => `${constraint} ${getResultantConstraint(constraint)}`;

export const whereStatement = (constraints: Array<Constraint>) => {

    if (constraints.length < 1) return "";

    return `${WHERE} ${constraints.map(constraintToString).join(AND)}`;

};

export const generateSelectQuery = ({ table, attributes, constraints }: IQuery): string => `${SELECT} ${stringFromAttributes(attributes)} ${FROM} ${createNameFromQuery(table)} ${WHERE}`;

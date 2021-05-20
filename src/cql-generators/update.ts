
import Table from "../table";
import { AND, createNameFromQuery, getResultantConstraint, IConstraint, ISelectStatement, isSelectStatement, whereStatement } from "./utils";

const UPDATE = "UPDATE";
const TTL = "TTL";
const TIMESTAMP = "TIMESTAMP";
const USING = "USING";
const SET = "SET";
const IF = "IF";
const NOT = "NOT";
const EXISTS = "EXISTS";

// UPDATE[keyspace_name.] table_name
// [USING TTL time_value | USING TIMESTAMP timestamp_value]
// SET assignment[, assignment]. . .
// WHERE row_specification
// [IF EXISTS | IF NOT EXISTS | IF condition[AND condition] . . .];

export interface UpdateStatementOptions {
    table: Table,
    assignment: Record<string, unknown>,
    constraints: Array<IConstraint>,
    ifNotExists?: boolean,
    ifExists?: boolean,
    conditions?: Array<IConstraint>,
    timestampValue?: string,
    timeValue?: string,
}

const withUsing = (string: string) => ` ${USING} ${string}`;

export const timeStampOrTimeValue = ({ timestampValue, timeValue }: { timestampValue?: string, timeValue?: string }): string => {

    if (timestampValue) return withUsing(`${TIMESTAMP} ${timestampValue}`);

    if (timeValue) return withUsing(`${TTL} ${timeValue}`);

    return "";
};

export const createAssignment = (assignment: Record<string, unknown>): ISelectStatement => ({
    query: Object.keys(assignment).map((key) => `${key} = ?`).join(", "),
    params: Object.values(assignment)
});

export const createCompareAndSet = ({ ifExists, ifNotExists, conditions }: { ifExists?: boolean, ifNotExists?: boolean, conditions?: Array<IConstraint> }): string | ISelectStatement => {

    if (ifExists) return ` ${IF} ${EXISTS}`;

    if (ifNotExists) return ` ${IF} ${NOT} ${EXISTS}`;

    if (conditions && conditions.length > 0) return { query: ` ${IF} ${conditions.map(getResultantConstraint).join(AND)}`, params: conditions.map(condition => condition.value) };

    return "";

};

export const createUpdateStatement = ({ table, assignment, constraints, ifExists, ifNotExists, conditions, timeValue, timestampValue }: UpdateStatementOptions): ISelectStatement => {

    const { query: assignmentQuery, params: assignmentParams } = createAssignment(assignment);

    const { query: whereQuery, params: whereParams } = whereStatement(constraints);

    const compareAndSet = createCompareAndSet({ ifExists, ifNotExists, conditions });

    const { query: compareAndSetQuery, params: compareAndSetParams } = (isSelectStatement(compareAndSet)
        ? compareAndSet
        : { query: compareAndSet, params: [] }) as ISelectStatement;

    return {
        query: `${UPDATE} ${createNameFromQuery(table)} ${timeStampOrTimeValue({ timeValue, timestampValue })} ${SET} ${assignmentQuery} ${whereQuery}${compareAndSetQuery};`,
        params: [...assignmentParams, ...whereParams, ...compareAndSetParams]
    };

};
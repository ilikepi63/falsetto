"use strict";
// import { Query, Schema } from ".";
// import { TextAttribute, UuidAttribute } from "./attributes";
// import ClusteringColumn, { ClusteringDirection } from "./clustering-column";
// import { createTable } from "./cql-generators/create-table";
// import { createInsertStatement } from "./cql-generators/insert-into";
// const personId = new UuidAttribute("person_id");
// const firstName = new TextAttribute("first_name");
// const lastName = new TextAttribute("last_name");
// const email = new TextAttribute("email");
// const PersonSchema = new Schema("person", {
//     id: personId,
//     firstName: firstName,
//     lastName: lastName,
//     email: email
// });
// const QueryByEmail = Query.from(PersonSchema)
//     .by(email);
// const QueryByfirstNameLastName = Query.from(PersonSchema)
//     .by([firstName, lastName])
//     .orderBy([new ClusteringColumn({ name: email.name, direction: ClusteringDirection.asc })]);
// console.log(createTable(QueryByfirstNameLastName));
// console.log(createInsertStatement(QueryByEmail));
/** Ideally this is the outcome that we want:
 *
 *  Schema.insert({data});
 *
 *  -- inserts into all of the different query tables that were defined from this insert
 *
 *  Schema.query({email = "cameron@x.com"})
 *  -- should be able to query it.
 *
 *
 */ 

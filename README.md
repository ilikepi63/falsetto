# Falsetto - lightweight ODM for Apache Cassandra :rocket:

[![Build Status](https://travis-ci.org/ilikepi63/falsetto.svg?branch=master)](https://travis-ci.org/ilikepi63/falsetto)[![Coverage Status](https://coveralls.io/repos/github/ilikepi63/falsetto/badge.svg?branch=master)](https://coveralls.io/github/ilikepi63/falsetto?branch=master)

Falsetto is a lightweight ODM layer on top of the cassandra-driver package, designed to make development with TS/JS as fast :rocket: as possible. Thank you for taking a look at the project, and if you feel this helped you in some way, please find out how you can contribute - we need all kinds of help :D 

## Start. 

```
npm install falsetto
```
or with yarn: 
```
yarn add falsetto
```

## Create. 

Let's use a humble User Schema as a beginning point, our schema has the following properties: 

* id - uuid
* firstName - String
* lastName - String
* email - String

Let's create the Schema:

```
// create some attributes:

const id = new UuidAttribute("id");
const firstName = new TextAttribute("first_name");
const lastName = new TextAttribute("last_name");
const email = new TextAttribute("email");

// we then generate a schema
const UserSchema = new Schema("user", {
    id,
    firstName,
    lastName,
    email
});
```
This is just a conceptual model at this point, and wouldn't have any effect on our physical implementation of this schema. So we've deliberated and possibly discussed with our architect(if that architect is someone other than you :) ) that this is all the information we need to save for the user. After some investigation and experimentation, we have decided that our user object needs to use the following query patterns: 

* get user by id 
* get user by email 

So, let's create those query patterns: 

```
const QueryById = Table.from(UserSchema).by(id);

const QueryByEmail = Table.from(UserSchema).by(email);
```

Now we have our conceptual model done, let's create those tables: 

```
// shoutout to the guys doing awesome work on cassandra-driver
const cassandra = require("cassandra-driver");

// create a client to issue queries on.
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'ks1'
});

// Create those tables.
UserSchema
    .createTables()
    .execute(client)
```

This will result in the following create table queries: 

```
CREATE TABLE user_by_id(
  id uuid,
  first_name text, 
  last_name text,
  PRIMARY KEY id
)

CREATE TABLE user_by_email(
  id uuid,
  first_name text, 
  last_name text,
  PRIMARY KEY email
)
```

## Insert.

Let's save our first user: 

```
  const id = uuid();
  const email = "john@doe.com";
  const firstName = "John";
  const lastName = "Doe";

  UserSchema
        .put({ email, firstName, lastName, id })
        .execute(client);
```

and there we go! This will create a User record in both our user_by_id and user_by_email tables by batch statements. 

## Query.

We can query our tables in two ways: by the schema and by id: 

```
// query by schema - please don't do this, this is a guess made using the queries, although it will work most of the time, 
// we don't want the proficiency of your system to be based on a guess :D 
const johnDoe = UserSchema
                      .get()
                      .where("id")
                      .equals("123")
                      .execute(client);

// query by table
const johnDoe = QueryByEmail
                        .get()
                        .where("email")
                        .equals("john@doe.com")
                        .execute(client)

// if you want to only get a subset of information, let's say just the id and email: 
const johnDoeIdEmail = QueryById
                         .get(["id","email"])
                         .where(id)
                         .equals("123")
                         .execute(client)
```

## Contributing

There is a lot that can be done to improve Falsetto, and we'd greatly appreciate it if you contributed, regardless of your skill level or where your skills lie. Whether it be documentation, error handling or feature adding, if you think that there is something that will be helpful, please submit a PR and we'll take a look, make changes(if any) and merge! 

CREATE KEYSPACE example
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};


CREATE TABLE users_by_email(
    id uuid,
    email text, 
    first_name text, 
    last_name text,
    created_date timestamp, 
    age int, 
    data blob,
    PRIMARY KEY ((id), create_date)
) WITH CLUSTERING ORDER BY (create_date desc);

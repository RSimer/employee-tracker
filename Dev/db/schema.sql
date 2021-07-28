
DROP DATABASE IF EXISTS project_db;
CREATE DATABASE project_db;

USE project_db;

-- department


CREATE TABLE department (
    id       INT     AUTO INCREMENT      NOT NUll,
    names             VARCHAR(30)         NOT NUll,
    PRIMARY KEY      (id)
);

-- role table


CREATE TABLE roles (
     id               INT     AUTO INCREMENT      NOT NUll,
     title                    VARCHAR(30)         NOT NUll,
     salary                    DECIMAL             NOT NULL,
     department_id    INT                         NOT NULL,

);

-- employees table

CREATE TABLE employees (
     id               INT     AUTO INCREMENT      NOT NUll,
     first_name               VARCHAR(30)         NOT NUll,
     last_name                VARCHAR(30)         NOT NULL,
     role_id          INT                         NOT NULL,
     manager_id       INT                         NOT NULL,

);

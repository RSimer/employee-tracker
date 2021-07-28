DROP DATABASE IF EXISTS department_db;
DROP DATABASE IF EXISTS roles_db;
DROP DATABASE IF EXISTS employees_db;

-- department
CREATE DATABASE department_db;

USE department_db;

CREATE department (
    id       INT     AUTO INCREMENT      NOT NUll,
    name             VARCHAR(30)         NOT NUll,
    PRIMARY KEY      (id)
);

-- role database
CREATE DATABASE roles_db;

USE roles_db;

CREATE roles (
     id               INT     AUTO INCREMENT      NOT NUll,
     title                    VARCHAR(30)         NOT NUll,
     salry                    DECIMAL             NOT NULL,
     department_id    INT                         NOT NULL,

);

-- employees database
CREATE DATABASE employees_db;

USE employees_db;

CREATE employees (
     id               INT     AUTO INCREMENT      NOT NUll,
     first_name               VARCHAR(30)         NOT NUll,
     last_name                VARCHAR(30)         NOT NULL,
     role_id          INT                         NOT NULL,
     manager_id       INT                         NOT NULL,

);

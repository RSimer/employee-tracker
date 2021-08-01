DROP DATABASE IF EXISTS project_db;
CREATE DATABASE project_db;

USE project_db;

-- department

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(30) NOT NUll
);


-- role table

CREATE TABLE roles (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(30) NOT NUll,
     salary DECIMAL NOT NULL,
     department_id INT NOT NULL,
     INDEX department_ind (department_id),
     CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- employees table

CREATE TABLE employees (
     id INT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30) NOT NUll,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manager_id INT,
     INDEX roles_ind (role_id),
     CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
     INDEX manager_ind (manager_id),
     CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE CASCADE
);

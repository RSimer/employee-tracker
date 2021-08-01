const db = require('./db/connections');
const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2/promise');



 const firstQuestion = () => {


    inquirer.prompt([

    {
        type:'list' ,
        message:'What do you want to do? (use arrow keys)',
        name: 'starting',
        choices:
            [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
            ]
    }

])
// going into different functions
    .then(data => {
        
        if (data.starting === 'View All Employees'){
             viewAllEmployees()
        }
        else if (data.starting === 'Add Employee'){
             addEmployees()
        }
        else if(data.starting === 'Update Employee Role'){
             updateEmployeeRole()
        }
        else if(data.starting === 'View All Roles'){
             viewAllRoles()
        }
        else if(data.starting === 'Add Role'){
             addRole()
        }
        else if(data.starting === 'View All Departments'){
            viewAllDepartments()
        }
        else if(data.starting === 'Add Department'){
            addDepartment()
        
        }
    })

};

const viewAllEmployees = () =>{

    const sql = `SELECT employees.id,employees.first_name,employees.last_name,roles.title,department.names AS department,roles.salary,CONCAT(manager.first_name,manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id;`

    db.promise().query(sql)
        .then(([rows])=>{
            console.table(rows)
            }).then(()=> firstQuestion());
    
};

const addEmployees = () =>{
    inquirer.prompt([
        {
            type:'input',
            message:'What is the employee`s first name?',
            name:'first_name',
            
        },
        {
            type:'input',
            message:'What is the the employee`s last name',
            name:'last_name',
        },
    ])
    const sql = `INSERT INTO employees SET`;

    db.promise().query(sql)
        .then(([rows])=>{
             console.table(rows)
                 }).then(()=> firstQuestion());

};

firstQuestion();

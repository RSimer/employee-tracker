const connenction = require('./db/connections');
const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2');



 const firstQuestion = () => {


    inquirer.prompt([

    {
        type:'list' ,
        message:'What do you want to do? (use arrow keys)',
        name: 'startingQuesiton',
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
// .then does not work with mysql12 so change that
    connenction.query(data => {
        switch(data){
        case (data.startingQuestion === 'View All Employees'):
             viewAllEmployees();
             break;
        case(data.startingQuestion === 'Add Employee'):
             addEmployees();
             break;
        case(data.startingQuestion === 'Update Employee Role'):
             updateEmployeeRole();
             break;
        case(data.startingQuestion === 'View All Roles'):
             viewAllRoles();
             break;
        case(data.startingQuestion === 'Add Role'):
             addRole();
             break;
        case(data.startingQuestion === 'View All Departments'):
            viewAllDepartments();
            break;
        case(data.startingQuestion === 'Add Department'):
            addDepartment();
            break;
        }
    })

};

const viewAllEmployees = () =>{

    const sql = `SELECT employee.id,employee.first_name,employee.last_name,role.title,department.name AS department,role.salary,CONCAT(manager.first_name,manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
    // change connection.promise
    connenction.query(sql)
    .then(([rows])=>{
        cTable(rows)
    }).then(()=> firstQuestion());
    
};

const addEmployees = () =>{
    inquirer.prompt([
        {
            type:'input',
            message:'What is the employee`s first name?',
            name:'first_name'
            
        },
        {
            type:'input',
            message:'What is the the employee`s last name',
            name:'last_name'
        }
    ])
    const sql = `INSERT INTO employee SET?`
    connenction.query(sql)
    .then(([rows])=>{
        cTable(rows)
    }).then(()=> firstQuestion());

};

firstQuestion();

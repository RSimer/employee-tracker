const { listenerCount } = require("events");
const connenction = require('./db/connections')
const inquirer = require("inquirer");
const cTable = require('console.table');
const sql = require('mysql2');


firstQuestion(() => {


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
            ],
    }

])
// going into different functions
.then((data) =>{
    if(data.startingQuestion === 'View All Employees'){
        return ViewAllEmployees();
    }else if(data.startingQuestion === 'Add Employee'){
        return AddEmployees();
    }else if(data.startingQuestion === 'Update Employee Role'){
        return UpdateEmployeeRole();
    }else if(data.startingQuestion === 'View All Roles'){
        return ViewAllRoles();
    }else if(data.startingQuestion === 'Add Role'){
        return AddRole();
    }else if(data.startingQuestion === 'View All Departments'){
        return ViewAllDepartments();
    }else if(data.startingQuestion === 'Add Department'){
        return AddDepartment();
    }
});

});

const ViewAllEmployees = () =>{

    const sql = `SELECT employee.id,employee.first_name,employee.last_name,role.title,department.name AS department,role.salary,CONCAT(manager.first_name,manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
    connenction.promise().query(sql)
    .then(([rows])=>{
        cTable(rows)
    }).then(()=> firstQuestion());
    
};

const AddEmployees = () =>{
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
    connenction.promise().query(sql)
    .then(([rows])=>{
        cTable(rows)
    }).then(()=> firstQuestion());

};

firstQuestion();


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

    const sql = `SELECT employees.id,employees.first_name,employees.last_name,roles.title,department.names AS department,
     roles.salary,CONCAT(manager.first_name,manager.last_name) AS manager FROM employees
     LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN department on roles.department_id = department.id
      LEFT JOIN employees manager on manager.id = employees.manager_id;`

    db.promise().query(sql)
        .then(([rows])=>{
            console.table(rows)
            }).then(()=> firstQuestion());
    
};

const addEmployees = () =>{
    const sql = `SELECT roles.id, roles.title FROM roles`;
    const sql2 = `SELECT employees.id, employees.first_name, employees.last_name FROM employees`;
    db.promise().query(sql)
        .then(([rows]) => {
            // saves off the role information into an array
            const roleArr = rows.map(row => ({ name: row.title, value: row.id }));
            db.promise().query(sql2)
                .then(([rows]) => {
                    // // saves off the manager information into an array
                    const managerArr = rows.map(row => ({ name: row.first_name + " " + row.last_name, value: row.id }))

    inquirer.prompt([
        {
            type:'input',
            message:'What is the employee`s first name?',
            name:'first_name',
            
        },
        {
            type:'input',
            message:'What is the employee`s last name',
            name:'last_name',
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Pick the manager',
            choices: [...managerArr, { name: "NONE", value: null }]
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Pick the role',
            choices: [...roleArr, { name: "NONE", value: null }]
        },
        
       
    ])



    
   const insert = `INSERT INTO employees SET`; 

    db.promise().query(insert)
        .then(([rows])=>{
             console.table(rows)
                 }).then(()=> firstQuestion());

})})};


// roles section
const updateEmployeeRole = () =>{
    inquirer.prompt([
        {
            type: 'list',
            message:'which employee would you like to update?',
            name: '',
            choices:[
                employees
            ]
        }
    ])

    const sql = `UPDATE`

    db.promise().query(sql)
    .then(([rows])=>{
         console.table(rows)
             }).then(()=> firstQuestion());
};

const viewAllRoles = () =>{

    const sql = `SELECT roles.id, roles.title, department.names AS department, roles.salary FROM roles JOIN department ON roles.department_id = department.id ORDER BY roles.id;`

    db.promise().query(sql)
        .then(([rows])=>{
            console.table(rows)
            }).then(()=> firstQuestion());
    
};

const addRole = () =>{
    inquirer.prompt([
        {
            type:'input',
            message:'What is the name of the role?',
            name:'title',
            
        },
        
    ])
   const sql = `INSERT INTO roles(title) VALUES() SET;`; 

    db.promise().query(sql)
        .then(([rows])=>{
             console.table(rows)
                 }).then(()=> firstQuestion());

};

// departments section
const viewAllDepartments = () =>{

    const sql = `SELECT id, names AS department FROM department ORDER BY id;;`
    db.promise().query(sql)
        .then(([rows])=>{
            console.table(rows)
            }).then(()=> firstQuestion());
    
};


const addDepartment = () =>{
    inquirer.prompt([
        {
            type:'input',
            message:'What is the name of the department?',
            name:'names',
            
        },
        
    ])
   const sql = `INSERT INTO department(names) VALUES() SET`; 

    db.promise().query(sql)
        .then(([rows])=>{
             console.table(rows)
                 }).then(()=> firstQuestion());

};

firstQuestion();

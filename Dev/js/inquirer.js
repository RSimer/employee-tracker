const { listenerCount } = require("events");
const inquirer = require("inquirer");

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


]);
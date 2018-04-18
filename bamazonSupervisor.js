var mysql = require('mysql');

var inquirer = require('inquirer');

var cTable = require('console.table')

//var for connection to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: 'bamazon'
});

//on connection
connection.connect(function (error) {
    if (error) throw error;
    //If no errors, run our customer app
    options();
})

//menu of options function
function options() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"],
            message: "\n\nWelcome Supervisor! What would you like to do?\n"
        }
    ]).then(function (answer) {
        if (answer.options === "View Product Sales by Department") {
            viewSales();
        }
        else if (answer.options === "Create New Department") {
            newDepartment();
        }
        else if (answer.options === "Exit") {
            console.log("Ok, see you next time!")
            connection.end();
            process.exit();
        }
    })
}

function viewSales() {
    connection.query("SELECT department_id, department_name, product_sales, over_head_costs, product_sales - over_head_costs AS total_profit FROM departments;",
    function(error, results){
        if (error) throw error;
        console.log("Sales by department: \n")
        console.table(results);
        console.log("\n\n\n\n\n")
        options();
    })
}

function newDepartment() {
    inquirer.prompt([
        {
        name:"new",
        type: "input",
        message: "Enter the Department Name"
        },
        {
            name:"overhead",
            type: "input",
            message: "What are the overhead costs for this deparment?"
        }
        ]).then(function(answer){
        connection.query("INSERT INTO departments SET ? ",
        {department_name: answer.new, over_head_costs: answer.overhead},
        function(error, results){
            if (error) throw error;
            console.log("The Department has been created!")
            console.log("\n\n\n\n")
            options();
        })
    })
}
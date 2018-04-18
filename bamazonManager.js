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
            choices: ["View Products for Sale", "View Low Inventory", "Restock Inventory", "Add New Product", "Exit"],
            message: "\n\nWelcome Manger! What would you like to do?\n"
        }
    ]).then(function (answer) {
        if (answer.options === "View Products for Sale") {
            viewProducts();
        }
        else if (answer.options === "View Low Inventory") {
            viewLowInventory();
        }
        else if (answer.options === "Restock Inventory") {
            restockInventory();
        }
        else if (answer.options === "Add New Product") {
            newProduct();
        }
        else if (answer.options === "Exit") {
            console.log("Ok, see you next time!")
            connection.end();
            process.exit();
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        console.table(results);
        options();
    });
};

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 10", function (error, results) {
        if (error) throw error;
        console.table(results);
        options();
    });
};

function restockInventory() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID number of the product to restock.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "How much will we add?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            connection.query(
                "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
                [answer.stock, answer.id],
               
                function (err) {
                    if (err) throw err;
                    console.log(`Added ${answer.stock} to the stock quantity!`);
                    options();
                }
            );
        });

};

function newProduct() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "What product are you adding?"
        },
        {
            name: "department",
            type: "input",
            message: "What department will this product be in?"
        },
        {
            name: "price",
            type: "input",
            message: "What will the price be?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock",
            type: "input",
            message: "How many will we stock?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function (err) {
                    if (err) throw err;
                    console.log("The product was added successfully!");
                    options();
                }
            );
        });
};

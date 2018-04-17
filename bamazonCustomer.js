var mysql = require('mysql');

var inquirer = require('inquirer');

//var for connection to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: 'bamazon'
});

//connection
connection.connect(function (error) {
    if (error) throw error;
    //If no errors, run our customer app
    customer();
})

//Main function of interface
function customer() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        //Print items for sale, then ask if the customer wants to buy something.
        inquirer
            .prompt([
                {
                    name: "products",
                    type: "list",
                    choices: function () {
                        var productArr = [];
                        for (var i = 0; i < results.length; i++) {
                            productArr.push(results[i].product_name);
                        }
                        return productArr;
                    },
                    message: "Would you like to purchase one of our awesome products?"
                },
                {
                    name: "buy",
                    type: "input",
                    message: "How many would you like?"
                }
            ]).then(function(answer){
                console.log(answer);
            });

    });
}


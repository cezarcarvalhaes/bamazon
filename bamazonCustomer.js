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
        console.log(`
        
            -------------------------------------Welcome to Bamazon!-------------------------------------
                                
                                                Check out our stock!
        `)
        for (var i = 0; i < results.length; i++) {
            console.log(
                `ID: ${results[i].item_id}    Item: ${results[i].product_name}     
                        Price: $${results[i].price}
                        `
            )
        }
        inquirer.prompt([
            {
                name: "enter",
                type: "confirm",
                message: "Would you like to make a purchase?"
            },
        ]).then(function(answer){

            if (answer.enter) {
                purchaseItem(results);
            }
            else {
                console.log('Bummer! Maybe next time!')
                connection.end();
            }
        });
    });
}

function purchaseItem(res) {
    var results = res;
    inquirer.prompt([
        {
            name: "buy",
            type: "input",
            message: "Please enter the ID number of the item you would like to purchase."
        },
        {
            name: "amount",
            type: "input",
            message: "Awesome. Now, how many would you like?"
        }
    ]).then(function(answer){
        var itemSelect;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id == answer.buy) {
            itemSelect = results[i];
          }

        }
        if (answer.amount <= itemSelect.stock_quantity) {
            var totalPrice = parseFloat(answer.amount) * itemSelect.price;
            var newAmount = itemSelect.stock_quantity - answer.amount;
            depleteStock(newAmount, itemSelect.item_id);
            console.log(`\nSuccess! You are purchasing ${answer.amount} ${itemSelect.product_name} for a total of $${totalPrice}\n`);
            customer();
        }
        else {
            console.log(`\nSorry, we only have ${itemSelect.stock_quantity} left in stock!\n`)
            customer();
        }
    });
}

function depleteStock(purchased, id){
    connection.query (
            "UPDATE products SET ? WHERE ?",[
            {
                stock_quantity: purchased
            },
            {
                item_id: id
            }
            ],
            function(error) {
                if (error) throw error;
            }
    )
};


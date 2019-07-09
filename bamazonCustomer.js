require("dotenv").config();
var mysql = require("mysql");
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    printProducts();
});

function printProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("============================================");
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID         : " + res[i].item_id);
            console.log("Product Name    : " + res[i].product_name);
            console.log("Department      : " + res[i].department_name);
            console.log("Price           : " + res[i].price.toFixed(2));
            console.log("On Hand Quantity: " + res[i].stock_quantity);
            console.log("============================================");
        }
        console.log("\n")
        printMenu();
    });
}

function printMenu() {
    inquirer
        .prompt([{
                type: "input",
                message: "What is the item ID of the product you'd like to buy?",
                name: "itemId"
            },
            {
                type: "input",
                message: "How many would you like to purchase?",
                name: "purchaseAmt"
            }
        ])
        .then(function (iResponse) {
            connection.query("SELECT * FROM products where item_id =" + '"' + iResponse.itemId + '"', function (err, res) {
                if (err) throw err;
                if (res.length) {
                    var itemId = iResponse.itemId;
                    var onHand = res[0].stock_quantity;
                    var requestedAmt = iResponse.purchaseAmt;

                    if (onHand < requestedAmt) console.log("Insufficient Stock.");
                    else processOrder(itemId, requestedAmt);
                } else {
                    console.log("Invalid item ID.");
                }
                connection.end();
            });
        });
}

function processOrder(itemId, requestedAmt) {
    console.log(itemId, requestedAmt);
    console.log("Success!");
}
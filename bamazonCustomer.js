/**
 * Global Variables & Packages
 */
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

/**
 * Create Connection
 */
var options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: "bamazon"
};
var connection = mysql.createConnection(options);
connection.connect(function (err) {
    if (err) throw err;
    displayProducts();
});

/**
 * @desc Formats and displays the products in the database then call the main menu
 */
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
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
        menu();
    });
}

/**
 * @desc Use inquirer to get input from the user about items they 'd like to purchase
 * Afterwards, query the DB based on the user's inputed purchase options
 */
function menu() {
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
            queryDB(iResponse);
        });
}

/**
 * @desc Query the database based on the users inputed purchase options, then process the order
 * if the order number is valid and there is enough product for their purchase
 * Process their order and finally, end the connection to host
 * @param iResponse is passed from the anonymous function defined by inquirer in the menu function
 */
function queryDB(iResponse) {
    connection.query("SELECT * FROM products WHERE item_id = ?",
        [
            iResponse.itemId,
        ],
        function (err, res) {
            if (err) throw err;
            if (res.length) {
                var itemId = iResponse.itemId;
                var onHand = res[0].stock_quantity;
                var requestedAmt = iResponse.purchaseAmt;
                var price = res[0].price;
                if (onHand < requestedAmt) console.log("Insufficient Stock.");
                else processOrder(itemId, requestedAmt, onHand, price);
            } else {
                console.log("Invalid item ID.");
            }
            connection.end();
        });
}

/**
 * @desc Update the database based on the users inputed purchase options
 * then display the price
 * @param itemId the unique item id the user requested to purchase, defined in queryDB function
 * @param requestedAmt the quantity of the item the user requested to purchase, defined in queryDB function
 * @param onHand the on hand quantity of the item the user requested to purchase, defined in queryDB function
 * @param price the price of the item the user requested to purchase, defined in queryDB function
 */
function processOrder(itemId, requestedAmt, onHand, price) {
    connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    [
        onHand-requestedAmt,
        itemId,
    ],
    function (err) {
        if(err) throw err;
        console.log(`Your Total: \$${(price * requestedAmt).toFixed(2)}`);
    });
}
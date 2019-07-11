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
    menu();
});

/**
 * @desc menu is a list of choices that a manager can perform, the connection won't disconnect until the user quits
 */
function menu() {
    inquirer
        .prompt([{
            type: "list",
            message: "Select from the following:",
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],
            name: "itemId"

        }]).then(function (iResponse) {
            if (iResponse.itemId === "View Products") {
                displayProducts();
            } else if (iResponse.itemId === "View Low Inventory") {
                viewLowInventory();
            } else if (iResponse.itemId === "Add to Inventory") {
                queryInventory();
            } else if (iResponse.itemId === "Add New Product") {
                addProduct();
            } else if (iResponse.itemId === "Quit") {
                connection.end();
                return;
            } else {
                console.log("Invalid Selection");
                connection.end();
                return;
            }
        });
}

/**
 * @desc Formats and displays the products in the database
 */
function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

/**
 * @desc Formats and shows the products with a on hand count lower than 5
 */
function viewLowInventory() {
    connection.query("SELECT * FROM products where stock_quantity < 5", function (err, res) {
        if (err) throw err;
        console.table(res);
        menu();
    });
}

/**
 * @desc performs a query to find the current stock quantity on a product which will be used
 * so a user cannot decrement the value when "adding" inventory
 */
function queryInventory() {
    inquirer.prompt([{
            type: "input",
            message: "Enter the ID of the Item You'd Like to Add Inventory To:",
            name: "itemId"

        },
        {
            type: "input",
            message: "What would you like to increase it to?",
            name: "newAmount"
        }
    ]).then(function (iResponse) {
        connection.query("SELECT * FROM products where item_id = ?",
            [
                iResponse.itemId,
            ],
            function (err, res) {
                if (err) throw err;
                if (res[0].stock_quantity < iResponse.newAmount) {
                    addToInventory(iResponse);
                } else {
                    console.log("Invalid Amount");
                    menu();
                }
            });
    });
}

/**
 * @desc after the on hand value is discovered, add to inventory will update
 * the stock quantity so long as the new quantity entered is greater than the current on hand
 */
function addToInventory(iResponse) {
    connection.query("UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: iResponse.newAmount
            },
            {
                item_id: iResponse.itemId
            }
        ],
        function (err) {
            if (err) throw err;
            console.log("Updated Successfully.")
            menu();
        }
    );
}

/**
 * @desc adds a product to the db
 */
function addProduct() {
    inquirer.prompt([{
            type: "input",
            message: "Enter the product name:",
            name: "productName"

        },
        {
            type: "input",
            message: "Enter the department name:",
            name: "department"
        },
        {
            type: "input",
            message: "Enter the price:",
            name: "price"
        },
        {
            type: "input",
            message: "Enter the stock quantity:",
            name: "stock"
        }
    ]).then(function (iResponse) {
        var product = {
            product_name: iResponse.productName,
            department_name: iResponse.department,
            price: Number(iResponse.price),
            stock_quantity: Number(iResponse.stock)
        };
        connection.query("INSERT INTO products SET ?", product, function(err) {
            if(err) throw err;
            console.log("Product successfully added.");
            menu();
        });
    });
}
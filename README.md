# bamazon
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [Examples](#examples)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

## About The Project
Bamazon is an Amazon-like storefront using MySQL and Node. The app will take in orders from customers and deplete stock from the store's inventory. 

### Customer View
`bamazonCustomer.js`
![bamazon][product-customer]  
This part of the app prompts users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second message asks how many units of the product they would like to buy.

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs `Insufficient quantity!`, and then prevents the order from going through.

If the store _does_ have enough of the product, the app fulfills the customer's order.
   * It updates the SQL database to reflect the remaining quantity.
   * Once the update goes through, the customer is shown the total cost of their purchase.

### Manager View
`bamazonManager.js`
![bamazonManager][product-manager]  
Running this application will:
  * List a set of menu options:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.
  * If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.
  * If a manager selects `Add to Inventory`, then it displays a prompt that will let the manager "add more" of any item currently in the store.
  * If a manager selects `Add New Product`, then it allows the manager to add a completely new product to the store.

### Built With
* JavaScript
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Inquirer](https://www.npmjs.com/package/inquirer)


## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [npm](https://npmjs.com/getnpm)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Inquirer](https://www.npmjs.com/package/inquirer)


### Installation  
1. Install [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
2. Clone the repo
```sh
git clone https:://github.com/miketdennison/bamazon.git
```
3. Use bamazon.sql to set up the database
4. Next, create a file named `.env`, add the following to it, replacing the values with your own database information.
```js
# Server Information
DB_HOST="YourServerName"
DB_USER="YourDBUserName"
DB_PW="YourDBPassword"
```
5. Install NPM packages in root directory
```sh
npm install
```


## Usage
1. `node bamazonCustomer.js`  
_OR_  
2. `node bamazonManager.js`


### Examples
1. `node bamazonCustomer.js`
![Customer-Example][customer-example]
2. `node bamazonManager.js`
* Displaying Low Inventory
![Low-Inventory-Example][low-inventory-example]
* Updating Inventory On-Hand
![Update-Inventory-Example][update-inventory-example]
* Adding a New Product
![Add-Product-Example][add-product-example]


## Contact
Michael Dennison - [LinkedIn](https://linkedin.com/in/michaeltdennison) - miketdennison@gmail.com  
Project Link: [https://github.com/miketdennison/liri-node-app](https://github.com/miketdennison/bamazon)


## Acknowledgements
* [npm](https://www.npmjs.com/)

<!-- IMAGES -->
[product-customer]: ./screenshots/customer_static.png
[product-manager]: ./screenshots/manager_static.png
[customer-example]: ./screenshots/customer.gif
[low-inventory-example]: ./screenshots/low_inventory.gif
[update-inventory-example]: ./screenshots/update_inventory.gif
[add-product-example]: ./screenshots/add_product.gif
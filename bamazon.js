//databases needed
var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: 122984,
    database: "bamazon_db"
});

connection.connect(function(error){
    if(error){
        throw(error);
    } else {
        console.log("Connected to database as id " + connection.threadId);
        printProducts();
        connection.end();
    }
})

function printProducts(){
     var query = connection.query(
         "SELECT * FROM products", 
         function(err, res) {
             if (err) throw err;
            console.log("Products: \n", res);
      });
      console.log(query.sql);
}

function orderForm(){
inquirer.prompt([
    {
        name: "productId",
        type: "input",
        message: "Please Type in the Product Id of what you would like to purchase?"
    }, {
        name: "howMany",
        type: "input",
        message: "How many would you like to purchase?"
    },
]).then(function(order){
    console.log("Product Ordered is " + order.productId + ".\n" + "Number Orderded is " + order.howMany + "." );

   connection.query (
        "UPDATE products SET ? WHERE ?", [
            {
                STOCK = STOCK - order.howMany,
            },
            {
                id: order.productId,
            }
        ]
    );

    var query1 = connection.query (
        "SELECT price FROM ?",
        {
            id: order.productId,
        }
    );
   
    var totalPrice = query1 * order.howMany;

    console.log("Your Total is " + totalPrice + ".");
});
};




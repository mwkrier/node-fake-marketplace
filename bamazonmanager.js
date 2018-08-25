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
        manageProducts();
        connection.end();
    }
})


function manageProducts(){
inquirer.prompt([
    {
        name: "command",
        type: "input",
        message: "What do you want to do?\nView Products\n View Low Inventory\n Add to Inventory\n Add New Product"           
    }
]).then(function(userInput){
    if(userInput.command === "View Products"){
        printProducts();

    }if(userInput.command === "View Low Inventory"){
        lowInventory();

    }if(userInput.command === "Add to Inventory"){
        addInventory();

    }if(userInput.command === "Add New Product"){
        addProduct();
    }else {
        console.log("Nothing to do today Manager");
    }
    
});
};

function printProducts(){
    var query = connection.query(
        "SELECT * FROM products", 
        function(err, res) {
            if (err) throw err;
           console.log("Products: \n", res);
     });
     console.log(query.sql);
};

function lowInventory(){
    var query = connection.query(
        "SELECT * FROM products WHERE ?", 
        {
            STOCK: STOCK < 5,
        },
        function(err, res){
            if(err)throw err;
            console.log(res);
        });
    console.log(query.sql);
};

function addInventory(){
    printProducts();

    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Which Product would you like to update?"
        },
        {
            name:"amount",
            type: "input",
            message:"How much stock would you like to add?" 
        }
    ]).then(function(managerUpdate){
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            {
                ID: managerUpdate.productId,
            },
            {
                STOCK: stock + managerUpdate.amount,
            },
        )
    });    
 console.log(query.sql);

}

function addProduct(){
    inquirer.prompt([
        {
            name: "newProduct",
            type: "input",
            message: "What is the new Products Name?"
        },
        {
            name:"department",
            type: "input",
            message:"What is its Department?" 
        },
        {
            name:"price",
            type: "input",
            message:"What is its Price?" 
        },
        {
            name:"stock",
            type: "input",
            message:"How many of the product?" 
        },
    ]).then(function(newProd){
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: newProd.newProduct,
                department_name: newProd.department,
                price: newProd.price,
                stock: newProd.stock
            },
            function(err,res){
                consoel.log(res.affectedRows + "new porduct created!");
            }
            
        )
    });    
 console.log(query.sql);

}




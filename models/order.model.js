const connection = require('../config/dbconfig')

var Orders = function (order) {
    this.dishId = order.dishId, 
    this.quantity = order.quantity, 
    this.checkoutId = order.checkoutId
}

Orders.add = function(order, result) {
    console.log("inside the models", order)
    connection.query("INSERT INTO orders (dishId, quantity,checkoutId) VALUES  ?", [order.map(ord => [ord.dishId,ord.quantity,ord.checkoutId])], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res)
        }
    })
}

Orders.show = function(dishId, result) {
    connection.query("SELECT * FROM orders WHERE dishId = ?", dishId, (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result",res)
            result(null, res)
        }
    })
}

module.exports = Orders;
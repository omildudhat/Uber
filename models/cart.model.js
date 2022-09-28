const connection = require('../config/dbconfig')

var Cart = function (cart) {
    this.customerId = cart.customerId,
    this.dishId = cart.dishId, 
    this.resturantId = cart.resturantId,
    this.quantity = cart.quantity
}

Cart.add = function(cart, result) {
    console.log("fjkfdnvjk", cart)
    connection.query("INSERT INTO cart SET ?", cart, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res) 
            result(null, res)
        }
    })
}

Cart.show = function(customerId,result) {
    connection.query("SELECT * FROM cart WHERE customerId = ?", customerId, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res)
            result(null, res)
        }
    })
}

Cart.remove = function(cartId, result) {
    connection.query("DELETE FROM cart WHERE cartId = ?", cartId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res)
            result(null, res)
        }
    })
}

Cart.updateDish = function(updateCart, result){
    connection.query("UPDATE cart SET dishId = ?, quantity = ?, resturantId = ? WHERE customerId = ?", 
    [updateCart.dishId, updateCart.quantity, updateCart.resturantId, updateCart.customerId], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res);
            result(null, res)
        }
    })
}

module.exports = Cart;
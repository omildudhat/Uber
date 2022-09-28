const connection = require('../config/dbconfig')

var Checkout = function (checkout) {
    this.customerId = checkout.customerId,
    this.resturantId = checkout.resturantId,
    this.caddressId = checkout.caddressId,
    this.total = checkout.total,
    this.pickup = checkout.pickup,
    this.delivery = checkout.delivery,
    this.statusf = checkout.statusf
}

Checkout.add = function(checkout, result) {
    connection.query("INSERT INTO checkout SET ?", checkout, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}

Checkout.show = function(resturantId,statusf, result) {
    connection.query("SELECT * FROM checkout WHERE resturantId = ? and statusf = ?", [resturantId, statusf], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res);
        }
    })
}

Checkout.remove = function(customerId, result) {
    connection.query("DELETE FROM orders WHERE customerId = ?", customerId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}
Checkout.showdish = function(checkoutId, result) {
    connection.query("SELECT d.*,o.quantity FROM dish d JOIN orders o ON o.dishId = d.dishId JOIN checkout c ON o.checkoutId = c.checkoutId WHERE o.checkoutId = ?", checkoutId, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res);
            result(null, res);
        }
    })
}

Checkout.status = function(checkoutId, state, result){
    connection.query("UPDATE checkout SET statusf = ? where checkoutId = ?", [state,checkoutId], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res);
            result(null, res);
        }
    })
}

Checkout.showstatus = function(checkoutId, result) {
    connection.query("SELECT statusf FROM checkout WHERE checkoutId = ? ", checkoutId, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}

    Checkout.pasto = function(customerId, mode, status, result) {
        connection.query("SELECT c.*, r.rname FROM checkout c JOIN resturant r ON c.resturantId = r.resturantId WHERE c.customerId = ? and c.delivery = ? and statusf = ?", [customerId,mode,status], (err, res)=> {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log("result", res)
                result(null, res)
            }
        })
    }

    Checkout.pastp = function(customerId, mode, status, result) {
        connection.query("SELECT c.*, r.rname FROM checkout c JOIN resturant r ON c.resturantId = r.resturantId WHERE c.customerId = ? and c.pickup = ? and statusf = ?", [customerId,mode, status], (err, res)=> {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log("result", res)
                result(null, res)
            }
        })
    }


Checkout.pastorders = function(checkoutId, result) {
    connection.query("SELECT d.*,c.caddressId,c.statusf,c.total,c.checkoutDate,a.street,a.city,a.state,a.country FROM dish d JOIN orders o ON o.dishId = d.dishId JOIN checkout c ON c.checkoutId = o.checkoutId JOIN caddress a ON c.caddressId = a.caddressId WHERE c.checkoutId = ?"
    ,checkoutId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("result", res)
            result(null, res)
        }
    })
}
module.exports = Checkout;
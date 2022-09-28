const connection = require('../config/dbconfig')

var Address = function (caddress) {
    this.street = caddress.street,
    this.customerId = caddress.customerId,
    this.city = caddress.city, 
    this.country = caddress.country,
    this.state = caddress.state
}


Address.add = function(caddr, result) {
    connection.query("INSERT INTO caddress SET ?", caddr, (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res)
        }
    })
}



Address.show = function(customerId, result) {
    connection.query("SELECT * FROM caddress WHERE customerId = ?", customerId, (err, res) => {
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


Address.delivery = function(caddressId, result){
    connection.query("SELECT a.street,a.city,a.state,a.country,c.cname FROM caddress a INNER JOIN customer c ON a.customerId = c.customerId WHERE a.caddressId = ?", caddressId, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res);
            result(null, res)
        }
    })
}
module.exports = Address;
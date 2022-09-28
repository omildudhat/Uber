const connection = require('../config/dbconfig')

var Favorite = function (fvrt) {
    this.customerId = fvrt.customerId;
    this.resturantId = fvrt.resturantId;
};

Favorite.addf = function(fvrt, result) {
    connection.query("INSERT INTO favourite SET ?", fvrt, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result",res)
            result(null, res)
        }
    })
}

Favorite.removef = function(customerId,resturantId, result) {
    console.log("customerId", customerId)
    console.log("resturantId", resturantId)
    connection.query("DELETE FROM favourite WHERE resturantId = ? AND customerId = ?", [resturantId, customerId], (err, res) => {
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

Favorite.show = function(customerId, result) {
    console.log("show",customerId)
    connection.query("SELECT * FROM resturant JOIN favourite ON resturant.resturantId = favourite.resturantId WHERE customerId = ?", customerId, (err, res) => {
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

Favorite.check = function(customerId,resturantId, result) {
    console.log("chekc",customerId, resturantId)
    connection.query("SELECT * FROM favourite WHERE resturantId = ? AND customerId = ?", [resturantId, customerId], (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            console.log("result", res)
            result(null, res);
        }
    })
}
module.exports = Favorite
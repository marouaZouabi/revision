var mongoose = require("mongoose");
var schema = mongoose.Schema;

var Product = new schema({
    title : String,
    price : Number,
    description : String,
    quantity : Number

});

module.exports = mongoose.model('products', Product);
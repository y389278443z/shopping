var mongoose   = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "productName":String,
  "productId":String,
  "salePrice":Number,
  "productImg":String
});

module.exports = mongoose.model('good',productSchema);


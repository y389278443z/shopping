var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productImage":String,
      "productName":String,
      "salePrice":String,
      "productNum":String,
      "checked":String
    }
  ],
  "addressList":Array
});

module.exports = mongoose.model('User',userSchema);



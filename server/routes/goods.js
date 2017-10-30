var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var goods = require('../models/goods');
var users = require('../models/users');


mongoose.connect('mongodb://localhost:27017/Product');

mongoose.connection.on('connected',function () {
  console.log('connect success');
});

mongoose.connection.on('error',function () {
  console.log('connect error');
});

mongoose.connection.on('disconnected',function () {
  console.log('disconnected');
});


router.get('/',function (req, res, next) {
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let sort = parseInt(req.param('sort'));
  let priceLevel = req.param('priceLevel');
  let skip = (page - 1)* pageSize;
  var priceGt= '',priceLte ='';
  var params = {};
  if(priceLevel != 'all'){
    switch (priceLevel){
      case '0':priceGt =0;priceLte =100;break;
      case '1':priceGt =100;priceLte =500;break;
      case '2':priceGt =500;priceLte =1000;break;
      case '3':priceGt =1000;priceLte =5000;break;
    }
    params = {
      salePrice:{
        $gt : priceGt,
        $lte: priceLte
      }
    }
  }

  let goodsModel = goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err, data) {
    if(err){
      res.json({
        status:-1,
        msg:err.message
      })
    }else{
      res.json({
        status:1,
        msg:'',
        result:{
          count:data.length,
          list:data
        }
      })
    }
  })
});


router.post('/addCart',function (req, res, next) {
  var userId = req.cookies.userId,productId=req.body.productId;
  users.findOne({userId:userId},function (err, userResult) {
    if(err){
      res.json({
        status:-1,
        msg:err.message
      })
    }else{
      if(userResult){
        var goodItem= '';
        userResult.cartList.forEach(function (item) {
          if(item.productId == productId){
            goodItem = item;
            item.productNum ++;
          }
        });

        if(goodItem){
          userResult.save(function(err,result){
            if(err){
              res.json({
                status:-1,
                msg:err.message
              })
            }else {
              res.json({
                status:1,
                msg:'',
                result:'success'
              })
            }
          })
        }else {
          goods.findOne({productId: productId}, function (err, result) {
            if (err) {
              res.json({
                status: -1,
                msg: err.message
              })
            } else {
              if (result) {
                var result1 = result.toObject();
                result1.productNum = 1;
                result1.checked = 1;
                console.log(result1);
                userResult.cartList.push(result1);
                userResult.save(function (err, result) {
                  if (err) {
                    res.json({
                      status: -1,
                      msg: err.message
                    })
                  } else {
                    res.json({
                      status: 1,
                      msg: '',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
});

module.exports = router;


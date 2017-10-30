var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/users');

mongoose.connect('mongodb://localhost:27017/Product');

router.get('/', function(req, res, next) {
  res.end('respond with a resource');
});


router.post('/login',function (req, res, next) {
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  User.findOne(param,function (err, doc) {
    if(err){
      res.json({
        status:-1,
        msg:err.message
      })
    } else{
      if(doc){
        res.cookie('userId',doc.userId,{
          path:'/',
          maxAge:1000*60*60
        });
        res.cookie('userName',doc.userName,{
          path:'/',
          maxAge:1000*60*60
        });
        res.json({
          status:1,
          msg:'',
          result:{
            userName:doc.userName
          }
        });
      }
    }
  })
});

router.post('/loginOut',function(req,res,next){
  res.cookie('userId','',{
    path:'/',
    maxAge:-1
  });

  res.json({
    status:1,
    msg:'',
    result:''
  })
});


router.get('/checkLogin',function (req, res, next) {
  if(req.cookies.userId){
    res.json({
      status:1,
      msg:'',
      result:req.cookies.userName
    })
  }else{
    res.json({
      status:-1,
      msg:'',
      result:'当前未登录'
    })
  }
});

//查询用户购物车
router.get('/cartList',function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err, result) {
    if(err){
      res.json({
        status:-1,
        msg:err.message,
        result:''
      })
    }else{
      if(result){
        res.json({
          status:1,
          msg:'',
          result:result.cartList
        })
      }
    }
  })
});

router.post('/cart/del',function (req, res, next) {
   var userId = req.cookies.userId;
   var productId = req.body.productId;
   User.update({userId:userId},{$pull:{'cartList':{'productId':productId}}},function (err, result) {
     if(err){
       res.json({
         status:-1,
         msg:err.message,
         result:''
       })
     }else{
       res.json({
         status:1,
         msg:'',
         result:'success'
       })
     }
   })
});


router.post('/cart/edit',function (req, res, next) {
  var userId = req.cookies.userId,
      productNum = req.body.productNum,
      productId = req.body.productId,
      checked = req.body.checked;
  User.update({userId:userId,'cartList.productId':productId},{"cartList.$.productNum":productNum,"cartList.$.checked":checked},function (err, result) {
    if(err){
      res.json({
        status:-1,
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:1,
        msg:'',
        result:'success'
      })
    }
  })
});

router.post('/cart/checkAll',function (req, res, next) {
   var userId = req.cookies.userId,
       checkAll = req.body.checkAll;
   User.findOne({userId:userId},function (err, result) {
     if(err){
       res.json({
         status:-1,
         msg:err.message,
         result:''
       })
     }else{
       if(result){
         result.cartList.forEach((item)=>{
           item.checked = checkAll;
         });
         result.save(function (err,result) {
            if(err){
              res.json({
                status:-1,
                msg:err.message,
                result:''
              })
            }else{
              res.json({
                status:1,
                msg:'',
                result:'success'
              })
            }
         })
       }
     }
   });
});

router.get('/addressList',function (req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function (err, result) {
    if(err){
      res.json({
        status:-1,
        msg:err.message,
        result:''
      })
    }else{
      if(result){
        res.json({
          status:1,
          msg:'',
          result:result.addressList
        })
      }
    }
  })
});

module.exports = router;

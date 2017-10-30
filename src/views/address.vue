<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
          <span>确认订单</span>
        </nav-bread>
        <div style="border:1px solid #eee;" class="container1">
          <div style="font-size:20px;font-weight:bold;margin:10px 30px;">选择地址:</div>
          <ul style="list-style: none" class="addList clear">
            <li v-for="(item,index) in addressList"  v-bind:class="{'checked':checkIndex==index}" @click="checkIndex=index">
              <a href="javascript:void(0)">
                 <ul style="list-style: none">
                   <li>{{item.userName}}</li>
                   <li>{{item.postCode}}</li>
                   <li>{{item.tel}}</li>
                   <li>{{item.streetName}}</li>
                 </ul>
              </a>
            </li>
          </ul>
        </div>
      <div class="container1">
        <div style="margin:10px 30px;font-size:20px;font-weight:bold;">
          我的购物车
        </div>
        <div>
          <table class="table">
            <thead>
            <tr class="cart-table">
              <td>商品信息</td>
              <td style="width: 30%">单价</td>
              <td style="width: 30%">总价</td>
            </tr>
            </thead>
            <tbody id="tbody">
            <tr class="cart-body" v-for="item in cartList" v-if="item.checked==1">
              <td>
                <img v-bind:src="'/static/'+item.productImage" alt="item.productName">
                <span style="font-weight:bold;display: inline-block;width:150px;">{{item.productName}}</span>
              </td>
              <td>{{item.salePrice}}</td>
              <td>{{item.productNum * item.salePrice}}</td>
            </tr>

            </tbody>
            <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="vertical-align: bottom">
                <span style="margin-right:20px;display: inline-block;width:100px;">总金额：<span style="font-size:24px;color:red;">{{totalPrice}}</span></span>
                <button class="btn btn-danger" @click="checkConfirm">确认订单</button>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
      </div>
        <nav-footer></nav-footer>
    </div>


</template>

<style>
  *{
    padding:0;
    margin:0;
  }

  .clear:after{
    content:'';
    display: block;
    clear:both;
  }
  .addList>li{
    float:left;
    width:30%;
    margin:10px;
  }
  .addList li a{
    border:1px solid #888;
    display: inline-block;
    width:100%;
    text-decoration: none;
    box-sizing: border-box;
  }
  .addList li a:hover{
    border:1px solid red;
  }
  .checked{
    background:#888;
    color:#fff;
  }
</style>

<script>
  import '../assets/css/cart.css'
  import './../../node_modules/bootstrap/dist/css/bootstrap.css'
  import NavHeader from '@/components/header.vue'
  import NavFooter from '@/components/footer.vue'
  import NavBread from '@/components/bread.vue'
  import Model from '@/components/model.vue'
  import axios from 'axios'
    export default {
        data() {
            return {
                addressList:[],
                checkIndex:0,
                cartList:[]
            }
        },
        components:{
          NavHeader,
          NavFooter,
          NavBread
        },
        mounted(){
          this.getAddress();
          this.init();
        },
        computed:{
          totalPrice(){
            var money = 0;
            this.cartList.forEach((item)=>{
              if(item.checked==1){
                money += parseFloat(item.salePrice)*parseInt(item.productNum);
              }
            })
            return money;
          }
        },
        methods:{
          getAddress(){
            axios.get('/users/addressList').then((res)=>{
              this.addressList = res.data.result;
              console.log(res.data.result);
            })
          },
          init(){
            axios.get('/users/cartList').then((res)=>{
              this.cartList = res.data.result;
            })
          },
          checkConfirm(){
            alert('购买成功！');
            this.$router.push({path:'/'});
          }
        }
    }
</script>

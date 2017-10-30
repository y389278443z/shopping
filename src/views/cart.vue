<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>购物车</span>
      </nav-bread>

      <div class="container1">
        <div class="cart-head">
          我的购物车
        </div>
        <div>
          <table class="table">
            <thead>
              <tr class="cart-table">
                <td>商品信息</td>
                <td style="width: 20%">单价</td>
                <td style="width: 20%">数量</td>
                <td style="width: 15%">总价</td>
                <td style="width: 15%">操作</td>
              </tr>
            </thead>
            <tbody id="tbody">
              <tr class="cart-body" v-for="item in cartList">
                <td>
                  <input type="checkbox" style="margin-right:15px;" :checked="item.checked ==1" @click="editCart('check',item)">
                  <img v-bind:src="'/static/'+item.productImage" alt="item.productName">
                  <span style="font-weight:bold;display: inline-block;width:150px;">{{item.productName}}</span>
                </td>
                <td>{{item.salePrice}}</td>
                <td class="cart-add"><a href="javascript:void(0)" @click="editCart('minu',item)">-</a>{{item.productNum}}<a href="javascript:void(0)" @click="editCart('add',item)">+</a></td>
                <td>{{item.productNum * item.salePrice}}</td>
                <td><a href="javascript:void(0)" @click="delConfirm(item.productId)">删除</a></td>
              </tr>

            </tbody>
            <tfoot>
              <tr>
                <td style="text-align: center;">
                  <input type="checkbox" style="margin-left:-150px;margin-top:30px;vertical-align: text-bottom" @click="checkAll" :checked="checkedAll" v-model="checkedAll">
                  <span style="font-weight:bold;">全选/取消全选</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td style="vertical-align: bottom">
                  <span style="margin-right:20px;display: inline-block;width:100px;">总金额：<span style="font-size:24px;color:red;">{{totalPrice}}</span></span>
                  <button class="btn btn-danger" @click="checkOut" v-bind:disabled="this.checkedCount==0">结算</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <model  :mdShow="deleteGood" @close="closeModel">
        <p slot="message">确认删除此商品吗？</p>
        <div slot="btnGroup" >
          <a href="javascript:void(0)" class="btn btn-danger" @click="delCart" style="margin-right:70px;">确认</a>
          <a href="javascript:void(0)" class="btn btn-danger" @click="deleteGood=false">取消</a>
        </div>
      </model>

      <nav-footer></nav-footer>
    </div>


</template>

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
                cartList:[],
                deleteGood:false,
                productId:''
            }
        },
      components:{
          NavHeader,
          NavFooter,
          NavBread,
          Model
      },
      computed:{
        checkedAll(){
         return this.checkedCount==this.cartList.length;
        },
        checkedCount(){
          var i =0;
          this.cartList.forEach((item)=>{
            if(item.checked == 1){
              i++;
            }
          });
          return i;
        },
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
      mounted(){
        this.init()
      },
      methods:{
          init(){
            axios.get('/users/cartList').then((res)=>{
              this.cartList = res.data.result;
            })
          },
          delConfirm(productId){
            this.productId = productId;
            this.deleteGood = true;
          },
          delCart(){
            axios.post('/users/cart/del',{productId:this.productId}).then((res)=>{
              if(res.data.status ==1){
                this.deleteGood = false;
                for(var i=0;i<this.cartList.length;i++){
                  if(this.cartList[i].productId == this.productId){
                    this.cartList.splice(i,1);
                    break;
                  }
                }
              }
            })
          },
          closeModel(){
            this.deleteGood = false;
          },
          editCart(stat,item){
            if(stat=='add'){
              item.productNum ++;
            }else if(stat =='minu'){
              if(item.productNum<=1){
                return;
              }else{
                item.productNum --;
              }
            }else{
              item.checked = item.checked==1?0:1;
            }
            console.log(item.checked);
            axios.post('/users/cart/edit',{
              productId:item.productId,
              productNum:item.productNum,
              checked:item.checked
            }).then((res)=>{
              if(res.data.status ==1){
                console.log('success');
              }
            })
          },
          checkAll(){
            var flag = !this.checkedAll;
            this.cartList.forEach((item)=> {
              item.checked = flag?1:0;
            })
            axios.post('/users/cart/checkAll',{
              checkAll:flag?1:0
            }).then((res)=>{
              if(res.data.status ==1){
                console.log('success');
              }else{
                console.log('err');
              }
            })
          },
          checkOut(){
            if(this.checkedCount > 0){
              this.$router.push({path:'/address'})
            }
          }
      }
    }
</script>

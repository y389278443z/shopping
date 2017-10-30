<template>
    <div>
      <nav-header :userName="$route.query.userName"></nav-header>
      <nav-bread>
        <span>商品</span>
      </nav-bread>
      <section class="container1" style="margin-top:50px;">
        <div class="sortBy col-md-offset-10" >
          <span style="font-weight:bold">排序方式:</span>
          <!--<a href="#" style="padding-right:10px;" v-for="(style,index) in filterStyle" @click="isFilter=index" v-bind:class="{'curs':isFilter == index}" >{{style}}</a>-->
          <a href="javascript:void(0)" style="padding-right:10px;" v-bind:class="{'curs':sortClass==true}" @click="sortClass=true">默认方式</a>
          <a href="javascript:void(0)" style="padding-right:10px;" @click="getSortGoods" v-bind:class="{'curs':sortClass==false}">价格 <img src="../../static/arrow.png" v-bind:class="{'sortUp':sortFlag}"></a>
        </div>
        <div style="margin-top:30px;" class="clean">
          <div class="col-md-2">
            <ul class="price-choice">
              <li><p style="font-weight:bold">价格区间：</p></li>
              <li><a href="javascript:void(0)" v-bind:class="{'curs':priceCheck=='all'}" @click="setPriceFilter('all')">所有</a></li>
              <li v-for="(filter,index) in priceFilter" ><a href="javascript:void(0)"  @click="setPriceFilter(index)" v-bind:class="{'curs':priceCheck==index}">{{filter}}</a></li>
            </ul>
          </div>

          <div class="col-md-9">
            <ul class="goods-list">
               <li v-for="item in goodList" >
                 <a href="javascript:void(0)"><img v-bind:src="'./../static/'+item.productImage" alt=""></a>
                 <p>{{item.salePrice}}</p>
                 <p>{{item.productName}}</p>
                 <div>
                   <button class="btn-hover" @click="addCart(item.productId)">加入购物车</button>
                 </div>
               </li>
            </ul>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5" class="infinite-scroll" v-show="isShow">
              加载中...
            </div>
            <div class="infinite-scroll" v-show="!isShow">
              没有更多了
            </div>
          </div>

        </div>
      </section>
      <model v-bind:mdShow="mdShow" v-on:close="closeModel">
        <div slot="message">请先登录！</div>
        <div slot="btnGroup">
          <a href="javascript:void(0)" class="btn btn-danger" @click="closeModel">关闭</a>
        </div>
      </model>
      <model v-bind:mdShow="mdShowCart" v-on:close="closeModel">
        <div slot="message">加入购物车成功！</div>
        <div slot="btnGroup">
          <a href="javascript:void(0)" class="btn btn-danger" @click="mdShowCart=false" style="margin-right:70px;">关闭</a>
          <router-link class="btn btn-success" to="/cart" href="javascript:void(0)">查看购物车</router-link>
        </div>
      </model>
      <nav-footer></nav-footer>
    </div>


</template>

<script>
  import '../assets/css/index.css'
  import './../../node_modules/bootstrap/dist/css/bootstrap.css'
  import NavHeader from '@/components/header.vue'
  import NavFooter from '@/components/footer.vue'
  import NavBread from '@/components/bread.vue'
  import Model from '@/components/model.vue'
  import axios from 'axios'
  import infiniteScroll from 'vue-infinite-scroll'
    export default {
        data() {
            return {
               goodList:[],
              filterStyle:[
                '默认方式',
                '价格'
              ],
              priceFilter:[
                  '0-100',
                  '100-500',
                  '500-1000',
                  '1000-5000'
              ],
              priceCheck:'all',
              isFilter:0,
              sortFlag:true,
              page:1,
              pageSize:6,
              busy:false,
              isShow:true,
              sortClass:true,
              mdShow:false,
              mdShowCart:false
            }
        },
      components:{
          NavHeader:NavHeader,
          NavFooter:NavFooter,
          NavBread:NavBread,
        Model:Model
      },
      mounted(){
          this.getGoods(false);
      },
      methods:{
        getGoods(flag){
          var param = {
            page:this.page,
            pageSize:this.pageSize,
            sort:this.sortFlag?1:-1,
            priceLevel:this.priceCheck
          }
          axios.get('/goods',{params:param}).then((res)=>{
                if(flag){
                  this.goodList = this.goodList.concat(res.data.result.list);
                  if(res.data.result.count <this.pageSize){
                    this.busy = true;
                    this.isShow = false;
                  }else{
                    this.busy = false;
                  }
                }else{
                  this.goodList = res.data.result.list;
                  this.busy = false;
                }
            }
          )
        },
        getSortGoods(){
          this.page = 1;
          this.sortClass = false;
          this.sortFlag = !this.sortFlag;
          this.getGoods(false);
        },
        loadMore(){
          this.busy = true;
          setTimeout(()=> {
            this.page++;
            this.getGoods(true);
          },500)
        },
        setPriceFilter(index){
          this.priceCheck = index;
          this.page = 1;
          this.getGoods()
        },
        addCart(productId){
          axios.post('/goods/addCart',{productId:productId}).then((res)=>{
            console.log(res);
            if(res.data.status == 1){
              this.mdShowCart =  true;
            }else{
              this.mdShow = true;
            }
          })
        },
        closeModel(){
          this.mdShow = false;
        }
      }
    }
</script>



<template>
  <header class="container1">
    <div>
      <a href="javascript:void(0)" style="display: inline-block;width:500px;
height:80px;color:#000;font-size:30px;font-weight:bold;line-height:80px;">
        杨哲的个人商城项目
      </a>
      <div class="right-btn">
        <span v-text="userName" v-if="userName"></span>
        <a href="javascript:void(0)" v-if="!userName" @click="jump">登录</a>
        <a href="javascript:void(0)" v-if="userName" @click="logOut">退出登录</a>
        <router-link href="javascript:void(0)" v-if="userName&&showCart" to="/cart">购物车</router-link>
      </div>
    </div>
  </header>


</template>

<script>
  import axios from 'axios'

    export default {
//      props:{
//        userName:''
//      },
       data() {
            return {
              showCart:true,
              userName:''
            }
        },
      mounted(){
        this.checkLogin();
      },
      methods:{
        jump(){
          this.$router.push({path:'/login'});
        },
        logOut(){
          axios.post('/users/loginOut').then((res)=>{
            if(res.data.status ==1){
              this.userName = '';
              this.$router.push({path:'/'});
            }
          })
        },
        checkLogin(){
          axios.get('/users/checkLogin').then((res)=>{
            if(res.data.status == 1){
              this.userName = res.data.result;
              if(this.$route.path == '/cart'){
                this.showCart = false;
              }
            }
          })
        }
      }
    }
</script>

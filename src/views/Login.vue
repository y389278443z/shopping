<template>
    <div>
      <header class="container1">
        <div>
          <a href="javascript:void(0)" style="display: inline-block;width:500px;
height:80px;color:#000;font-size:30px;font-weight:bold;line-height:80px;">
            杨哲的个人商城项目
          </a>
          <span class="welcome">欢迎登录</span>
        </div>
      </header>
      <section class="login-sec">
        <div class="login-form">
          <div class="user-login">
            用户登录
          </div>
          <div style="color:red;text-align: center;" v-show="errorTip">
            *用户名或者密码错误
          </div>
          <div class="form-group" style="margin-bottom:15px;">
            <label for="username" class="form-label">用户名:</label>
            <input type="text" id="username" name="username" v-model="userName" placeholder="请输入用户名">
          </div>
          <div class="form-group">
            <label for="userpwd" class="form-label">密码:</label>
            <input type="password" id="userpwd" name="userpwd" v-model="userPwd" placeholder="请输入密码" @keyup.enter="login">
          </div>
          <div>
            <button class="form-btn" @click="login">登录</button>
          </div>
        </div>
      </section>
      <nav-footer></nav-footer>
    </div>


</template>

<script>
  import '../assets/css/login.css'
  import './../../node_modules/bootstrap/dist/css/bootstrap.css'
  import NavFooter from '@/components/footer.vue'
  import axios from 'axios'
    export default {
        data() {
            return {
                errorTip:false,
                userName:'',
                userPwd:''
            }
        },
      components:{
        NavFooter:NavFooter
      },
      mounted(){

      },
      methods:{
          login(){
            if(!this.userName || !this.userPwd){
              this.errorTip = true;
              return;
            }
            axios.post('/users/login',{
              userName:this.userName,
              userPwd:this.userPwd
            }).then((res)=>{
              if(res.data.status ==1){
                this.errorTip = false;
                this.$router.push({ path: "/?userName="+this.userName})
              }else{
                this.errorTip = true;
              }
            })
          }
      }
    }
</script>

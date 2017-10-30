import Vue from 'vue'
import Router from 'vue-router'
import GoodList from './../views/GoodList.vue'
import Header from './../components/header.vue'
import Login from '../views/Login.vue'
import Cart from '../views/cart.vue'
import Address from '../views/address.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:GoodList
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/address',
      component:Address
    }
  ]
})

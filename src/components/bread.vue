<template>
  <nav class="container1" style="background:#c5c6c8;padding-left:15px;font-size:16px;">
    <router-link href="javascript:void(0)" style="margin-left:50px;" to="/">主页</router-link>
    /
    <slot></slot>
  </nav>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        }
    }
</script>

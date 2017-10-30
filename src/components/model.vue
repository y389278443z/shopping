<template>
  <div v-show="mdShow">
    <div class="model">
      <div class="model-dialog">
        <div class="model-head">
          <slot name="message"></slot>
        </div>
        <div class="model-head">
          <slot name="btnGroup"></slot>
        </div>
      </div>
    </div>
    <div class="modal-backup">

    </div>
  </div>
</template>
<style>
  .model{
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index:1001;
  }
  .model-dialog{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width:400px;
    height:200px;
    background: #fff;
    border-radius: 10px;
  }
  .modal-backup {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
  }
  .model-head{
    text-align: center;
    margin:50px 0;
    color:#5e5e5e;
    font-size:20px;
  }
</style>
<script>
    export default {
        props:["mdShow"],
        data() {
            return {
                msg: 'hello vue'
            }
        },
      methods:{
          closeModel(){
            this.$emit('close');
          }
      }
    }
</script>

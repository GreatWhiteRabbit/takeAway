<template>
  <div class="navbar">
    <div class="header">
      <div class="search">
        <div class="icon" @click="search">
          <img src="@/assets/img/icon/search.svg">
        </div>
        <div class="form">
          <input type="search" placeholder="搜索" v-model="goodsname" @keyup.enter.native="keyDown">
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "NavBar",
  data(){
    return{
      goodsname:''
    }
  },
  methods:{
    keyDown(e){
      if(e.keyCode===13){
        this.search();
      }
    },
    search(){
      if(this.goodsname!==''){
        axios({
            method:'get',
          url:this.HOST+"information/search",
          params:{
              goodsname:this.goodsname
          }
        }).then(res => {
          this.$store.state.information=res.data;
          this.$router.push('/main');
        }).catch(err => {
          alert('服务器连接失败，请重试')
        })
      }
    }
  },
  mounted() {
    window.addEventListener('keydown',this.keyDown);
  },
  destroyed() {
    window.removeEventListener('keydown',this.keyDown,false);
  }
}
</script>

<style scoped>
.navbar{
  display: flex;
  flex-direction: column;
}
.header{
  height: 100px;
  align-items: center;
  display: flex;
  background-image: linear-gradient(#d0d01c, #e1e172, #e5e579);
}
.search{
  height: 50px;
  position: fixed;
  left: 35%;
  /*width: 600px;*/
  width: 400px;
  display: flex;
  background-color: #eaeaee;
  border-radius: 50px;
  align-items: center;
}
.icon{
  width: 40px;
  height: 40px;
}
.icon img{
  height: 40px;
  width: 40px;
}
.form{
  /*width: 400px;*/
  width: 200px;
  height: 50px;
}
.form input{
  border: none;
  height: 50px;
  /*width: 400px;*/
  width: 200px;
  background-color:#eaeaee ;
  outline: none;
}
</style>
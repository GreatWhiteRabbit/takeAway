<template>
  <div>
    <div class="mainBody" >
      <div class="seller">
        <span>我的店铺</span>
        <span>{{shopname}}</span>
      </div>
      <div class="seller" @click="showMenu">
        <span>我的菜品</span>
        <span> > </span>
      </div>
      <div class="seller" @click="showSend">
        <span>外卖配送</span>
        <span> > </span>
      </div>
      <div class="seller" @click="addMenu">
        <span>添加菜品</span>
        <span> > </span>
      </div>

      <router-view></router-view>
      <div class="tuichu" @click="exit">
        <span>退出登录</span>
      </div>
    </div>
    <div class="Noshow"></div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "sellerProfile",
  data(){
    return{
      Info:[],
      sellerid:'',
      shopname:''
    }
  },
  created(){
    this.sellerid=this.$store.state.sellerid;
    this.getInfo();

  },
  methods:{
    exit(){
      this.$router.replace('/sellerLogin');
    },
    getInfo(){
      axios({
        method:'get',
        url:this.HOST+"information/sellerGetInfo",
        params:{
          shopid:this.sellerid
        }
      }).then(res =>{
        this.Info=res.data
        this.shopname=this.Info[0].shopname;
        this.$store.state.memuInfo=this.Info;
      }).catch(err =>{
        alert('连接服务器失败，请重试')
      })
    },
    showMenu(){
      this.$router.push({
        path:'/menu',
        query:{
          Info:this.Info
        }
      })
    },
    showSend(){
      this.$router.push('/send');
    },
    addMenu(){
      this.$router.push('/addMenu');
    }
  }
}
</script>

<style scoped>
.mainBody{
    height: 996px;
position: fixed;
  width: 880px;
  background-color: #eefdea;
}
.seller{
  height: 75px;
  line-height: 75px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 1px 1px rgb(200, 200, 200);
}
.tuichu{
  height: 30px;
  width: 100px;
  position: fixed;
  bottom: 50px;
  left: 40%;
  background: #d93d3d;
  font-size: 20px;
  color: white;
  align-items: center;
  text-align: center;
}
.Noshow {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 48px;
  width: 880px;
  background-color: rgba(250, 250, 250, 0.99);
}
</style>
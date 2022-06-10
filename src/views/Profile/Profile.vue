<template>
  <div class="myprofile">
    <top-bar>
      <template v-slot:center>
        我的
      </template>
      <template v-slot:right v-if="isLogin" >
        <button @click="exitLogin">退出登录</button>
      </template>
    </top-bar>

    <div class="profile-login" v-if="!isLogin" @click="login">
      <span>登录\注册</span>
      <span> > </span>
    </div>
    <div class="profile-login" v-if="!isLogin" @click="sellerLogin">
      <span>商家登录\注册</span>
      <span> > </span>
    </div>
    <div class="profile-img" v-if="isLogin">
      <span>头像</span>
      <img :src=url alt="picture">
    </div>
    <div class="profile-login" v-if="">
      <span>用户名</span>
      <span>{{$store.state.userid}}</span>
    </div>
    <div class="profile-login">
      <span>性别</span>
      <span> 未填写 </span>
    </div>
    <div class="profile-login">
      <span>地址</span>
      <span> 未填写 </span>
    </div>
    <div class="profile-login">
      <span>更多信息</span>
      <span> > </span>
    </div>
    <div class="profile-login">
      <span>设置</span>
      <span> > </span>
    </div>

  </div>

</template>

<script>
import TopBar from "@/components/common/TopBar/TopBar";
import Login from "@/views/Login/Login";

export default {
  name: "Profile",
  components: {Login, TopBar},
  data() {
    return {
      isLogin: false,
      url:require('@/assets/img/icon/headshot.svg')
    }
  },
  created() {
    if (this.$store.state.userid !== '')
      this.isLogin = true;
  },
  methods:{
    login(){
     let login=this.$router.resolve(
         {path:'/login'}
     );
     window.open(login.href,'_blank');
    },
    sellerLogin(){
      let login=this.$router.resolve(
          {path:'/sellerLogin'}
      );
      window.open(login.href,'_blank');
    },
    exitLogin(){
      this.$store.state.userid='',
          this.$store.state.totalPrice=0
        this.$router.replace('/login');
    }
  }
}
</script>

<style scoped>
.myprofile {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.profile-login {
  height: 75px;
  line-height: 75px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 1px 1px rgb(200, 200, 200);
}

.profile-img {
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-img img{
  height: 80px;
  width: 80px ;
}
</style>
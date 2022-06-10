<template>
  <div class="login-banner">
    <div class="login">
      <div class="login-tab">
        <span  @click="denglu" :class="{change:isregist}">账户登录</span>
        <span  @click="zhuce" :class="{change:!isregist}">注册</span>
      </div>
      <div class="login-box">
        <div class="login-input">
          <span >用户:</span>
          <input type="text" placeholder="邮箱/用户名/手机号" v-model="userid">
        </div>
        <div class="login-input">
          <span >密码:</span>
          <input type="password" placeholder="密码" v-model="password">
        </div>
      </div>
      <div class="login-button">
        <span v-if="isregist" @click="log">登录</span>
        <span v-else @click="reg">注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      isregist: true,
      userid:'',
      password:''
    }
  },
  methods: {
    denglu(){
      this.isregist=true;
    },
    zhuce(){
      this.isregist=false;
    },
    log(){
      axios({
      method:'get',
        url:this.HOST+"users/login",
        params:{
          userid:this.userid,
          password:this.password,
          status:'no'
        }
      }).then(res =>{
        if(res.data===true){
          this.$store.state.userid=this.userid;
         this.$router.push({path:'/Profile',query:{userid:this.userid}});
        } else {
          alert('用户名或者密码错误，清重新登录');
        }
      }).catch(err =>{
        alert('未连接到服务器，请检查您的网络')
      })
    },
    reg(){
      this.isregist=false;
      axios({
        method:'get',
        url:this.HOST+"/users/register",
        params:{
          userid:this.userid,
          password:this.password
        }
      }).then(res =>{
        if(res.data===true)
        {
          this.$store.state.userid=this.userid;
          this.$router.push({path:'/Profile',query:{userid:this.userid}});
        } else {
          alert('注册失败，请重新注册');
        }
      }).catch(err =>{
        alert('未连接到服务器，请检查您的网络')
      })
    }
  }
}
</script>

<style scoped>
.login-banner {
  height: 996px;
  position: fixed;
  width: 1700px;
  background-color: #f5456e;
  display: flex;
  /*align-items: center;*/
  /*justify-content: center;*/
  /*text-align: center;*/
}

.login {
  margin-top: 200px;
  margin-left: 200px;
  background-color: #ffffff;
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
}

.login-tab {
  color: #0f0f0f;
  display: flex;
justify-content: space-around;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
}

.login-box {
  height: 200px;
  box-shadow: 0px -7px 7px -7px #c5c1c1;
}
.login-input {
  margin-left: 10px;
  margin-top: 30px;
  height: 50px;
  width: 350px;
  border: 1px solid;
  line-height: 50px;
  display: flex;
}
.login-input input {
  border: none;
  width: 250px;
  outline: none;
}
.login-button {
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #e4393c;
  color: #ffffff;
}
.change{
 background: red;
}
</style>
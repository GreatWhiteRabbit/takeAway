<template>
  <div>
    <div :class="{all:showBol}">
      <br> <br><br><br>
      <div class="payCount">
        <h1>{{"￥"+$store.state.totalPrice.toFixed(1)}}</h1>
      </div>
      <br> <br><br><br>
      <button class="mui-btn mui-btn-primary mui-btn-block" @click="payPassword">确认支付</button>
      <div v-if="showBol" class="showToast">
        <span class="payCountText">支付密码</span>
        <div class="payCountInput">
          <input type="number" ref="psw" maxlength="6" v-model="psw" @blur="onBlur"/>
          <ul class="pwd-wrap">
            <li class="pswInput" >
              <i v-if="psw.length > 0"></i>
            </li>
            <li class="pswInput" >
              <i v-if="psw.length > 1"></i>
            </li>
            <li class="pswInput" >
              <i v-if="psw.length > 2"></i>
            </li>
            <li class="pswInput" >
              <i v-if="psw.length > 3"></i>
            </li>
            <li class="pswInput" >
              <i v-if="psw.length > 4"></i>
            </li>
            <li class="pswInput" >
              <i v-if="psw.length > 5"></i>
            </li>
          </ul>
        </div>
        <div class="payCountBtn">
          <div @click="cancelBtn">取消</div>
          <div class="sure" @click="sureBtn">确定</div>
        </div>
      </div>
    </div>
    <div class="Noshow"></div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Pay",
  data() {
    return {
      psw: '',
      showBol: false
    }
  },
  destroyed(){
    this.showBol = false;
  },
  methods: {
    //点击去支付
    payPassword() {
      this.showBol = true
      setTimeout(() => {
        this.$refs.psw.focus()
      }, 10);
    },

    //点击取消
    cancelBtn() {
      this.showBol = false;
      this.psw = ''
    },

    //点击支付
    sureBtn() {
      this.showBol = false
     if(this.psw==='123456'){
         for (let i = 0; i < this.$store.state.goPay.length; i++) {
        axios({
          method: 'post',
          url: this.HOST + "purchase/payPurchase",
          data: {
            goodsid: this.$store.state.goPay[i].imgurl,
            userid: this.$store.state.userid,
            shopid: this.$store.state.goPay[i].shopid,
            counter: this.$store.state.goPay[i].counter,
            send: 'no',
            pay: 'yse',
          }
        }).then( res =>{
          if(res.data===true){
             alert('支付成功');
             this.$router.push('/order');
             console.log(this.psw)
             this.$store.state.totalPrice=0;
          } else {
            alert('支付失败，请稍后再试')
          }
        }).catch(err => {
          alert('服务器连接失败，请重试')
        })
      }
       // alert('支付成功');
       // this.$router.push('/order');
       // console.log(this.psw)
       // this.$store.state.totalPrice=0;
     }
      else{
        alert('密码错误');
       this.psw = '';
     }

    },

    //让焦点永远保持在input标签
    onBlur(){
      if(this.showBol){
        this.$refs.psw.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.Noshow {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 48px;
  width: 880px;
  background-color: rgba(250, 250, 250, 0.99);
}

.all {
  background-color: rgb(125, 125, 125);
  height: 100vh;
}

.payCount {
  text-align: center;
}

.showToast {
  position: absolute;
  top: 200px;
  left: 10px;
  width: 350px;
  height: 270px;
  background-color: white;
  text-align: center;

  .payCountText {
    display: block;
    margin-top: 25px;
    font-weight: bold;
    font-size: 25px;
  }

  .payCountInput {
    position: absolute;
    top: 90px;
    left: -42px;
    display: flex;

    input {
      width: 0.1px;
      height: 0.1px;
      color: transparent;
      border: none;
      font-size: 18px;
      opacity: 0;
      z-index: -1;
    }

    .pswInput {
      font-size: 50px;
      width: 50px;
      height: 50px;
      border: 1px grey solid;
    }

    .pwd-wrap {
      display: flex;

      li {
        list-style: none;
      }

      i {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: #000;
        display: inline-block;
      }
    }
  }

  .payCountBtn {
    position: absolute;
    bottom: 0;
    width: 350px;
    display: flex;

    div {
      width: 50%;
      height: 50px;
      font-size: 24px;
      line-height: 50px;
      border: 1px grey solid;
    }

    .sure {
      color: blue;
    }
  }
}
</style>
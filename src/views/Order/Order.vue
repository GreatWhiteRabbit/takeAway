<template>
  <div class="order">
    <top-bar>
      <template v-slot:center>
        <span>订单</span>
      </template>
    </top-bar>
    <div class="bar" v-if="this.purchaseInformation.length!==0">
      <div class="mainbody" v-for="(item,index) in purchaseInformation" :class="bgc[index%5]">
        <div class="left">
          <img :src="require('@/assets/img/food/'+item.imgurl+'.jpg')">
        </div>
        <div class="center">
          <div class="center-shop">
            <span>{{ item.shopname }}</span>
            <span>{{ "(" + item.address + ")" }}</span>
          </div>
          <div class="center-menu">
            <span>{{ item.goodsname }}</span>
          </div>
        </div>
        <div class="right">
          <div class="right-price">
            <span>{{ "￥" + item.price * item.counter }}</span>
            <span style="color: #0f0f0f;margin-left: 20px">{{ item.counter + "份" }}</span>
          </div>
          <div v-if="item.pay==='no'">
            <button style="color: white;background: #ea5353;border: 0px" @click="deletePurchase(index)">删除</button>
          </div>
          <div v-else-if="item.send==='no'" style="margin-right: 20px">
            <span>商家制作中</span>
          </div>
          <div v-else-if="item.send==='yes'">
            <span>外卖小哥配送中</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.purchaseInformation.length!==0&&isAllpay===true"
         style="height: 40px;line-height: 40px;font-size: 20px;text-align: center;">
      <span>总价：￥</span>
      <span style="color: #f5456e">{{ this.$store.state.totalPrice.toFixed(1) }}</span>
    </div>
    <div v-if="this.purchaseInformation.length!==0 &&isAllpay" style="text-align:
    center;height: 100px;display:flex;  ">
      <button
          style="background: #f5456e;color: white;border: none;height: 40px;width: 100px;font-size: 20px;
margin-left: 400px"
              @click="updatePay">去支付
      </button>
    </div>
    <div v-else-if="this.purchaseInformation.length===0" style="height: 300px;width: 300px;text-align: center">
      <img :src=empty>
      <span>空空如也</span>
      <h2>如果页面未刷新，请重新进入该页面</h2>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar/TopBar";
import axios from "axios";

export default {
  name: "Order",
  components: {TopBar},
  data() {
    return {
      empty: require('@/assets/img/food/empty.jpg'),
      bgc: ['ss1', 'ss2', 'ss3', 'ss4', 'ss5'],
      purchaseInformation: [
        {
          imgurl: '',
          shopname: '',
          counter: '',
          send: '',
          pay: '',
          goodsname: '',
          price: '',
          address: '',
        }
      ],
      //change用于记录中转
      change:
          {
            imgurl: '',
            shopname: '',
            counter: '',
            send: '',
            pay: '',
            goodsname: '',
            price: '',
            address: '',
          }
    }
  },
  computed:{
    isAllpay(){
      for(let i=0 ;i<this.purchaseInformation.length;i++){
        if(this.purchaseInformation[i].pay==='no')
          return true;
      }
      return false;
    }
  },
  created() {
    this.$store.state.totalPrice = 0;
    this.getInformation();
    this.getPurchase();
    this.setPurchaseInformation();
  },
  methods: {
    getInformation() {
      axios({
        method: 'post',
        url: this.HOST + "information/selectAll"
      }).then(res => {
        this.$store.state.allInfo = res.data;
      }).catch(err => {
        alert('与服务器发生中断，请重试');
      })
    },
    getPurchase() {
      axios({
        method: 'get',
        url: this.HOST + "purchase/getByuserid",
        params: {
          userid: this.$store.state.userid
        }
      }).then(res => {
        this.$store.state.allPurchase = res.data;
      }).catch(err => {
        alert('服务器连接中断，请检查网络');
      })
    },
    setPurchaseInformation() {
      for (let i = 0; i < this.$store.state.allPurchase.length; i++) {
        for (let j = 0; j < this.$store.state.allInfo.length; j++) {
          if (this.$store.state.allPurchase[i].goodsid === this.$store.state.allInfo[j].goodsid) {
            this.change.imgurl = this.$store.state.allPurchase[i].goodsid;
            this.change.counter = this.$store.state.allPurchase[i].counter;
            this.change.shopname = this.$store.state.allInfo[j].shopname;
            this.change.send = this.$store.state.allPurchase[i].send;
            this.change.pay = this.$store.state.allPurchase[i].pay;
            this.change.address = this.$store.state.allInfo[j].address;
            this.change.price = this.$store.state.allInfo[j].price;
            this.change.goodsname = this.$store.state.allInfo[j].goodsname;
            this.purchaseInformation.push(this.change);
            if(this.$store.state.allPurchase[i].pay==='no'){
              this.$store.state.totalPrice += this.$store.state.allInfo[j].price * this.$store.state.allPurchase[i].counter;
            }
            this.change = [];
            // this.List.push(j);
          }
        }
      }
      this.purchaseInformation.splice(0, 1);
      console.log(this.purchaseInformation);
    },
    deletePurchase(index) {
      axios({
        method: 'get',
        url: this.HOST + "purchase/deletePurchase",
        params: {
          userid: this.$store.state.userid,
          goodsid: this.purchaseInformation[index].imgurl
        }
      }).then(res => {
        if (res.data === true) {
          alert('删除成功');
          this.purchaseInformation = [];
          this.$store.state.allPurchase = [];
          this.$store.state.allInfo = [];
          this.getInformation();
          this.getPurchase();
          this.setPurchaseInformation();
        } else {
          alert('删除失败')
        }
      }).catch(err => {
        alert('连接服务器失败，请重试');
      })
    },
    updatePay() {
      this.$store.state.goPay=this.purchaseInformation;
      this.$router.push('/pay');
    /*  for (let i = 0; i < this.purchaseInformation.length; i++) {
        axios({
          method: 'post',
          url: this.HOST + "purchase/payPurchase",
          data: {
            goodsid: this.purchaseInformation[i].imgurl,
            userid: this.$store.state.userid,
            shopid: this.$store.state.allPurchase[i].shopid,
            counter: this.purchaseInformation[i].counter,
            send: 'no',
            pay: 'yse',
          }
        }).then( res =>{
          if(res.data===true){
            //alert('支付成功')
            this.$router.push('/pay');
          } else {
            alert('支付失败，请稍后再试')
          }
        }).catch(err => {
          alert('服务器连接失败，请重试')
        })
      }*/
    }

  }
}
</script>

<style scoped>
.order {
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.right {
  height: 150px;
  width: 140px;
  display: flex;
  flex-direction: column;
}

.bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

img {
  height: 100%;
  width: 100%;
}

.mainbody {
  height: 150px;
  width: 600px;
  margin-bottom: 10px;
  border-radius: 10px 10px;
  display: flex;
  line-height: 150px;
  align-items: center;
}

.left {
  width: 200px;
  height: 150px;
}

.center {
  height: 150px;
  width: 250px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.right-price {
  font-size: 22px;
  color: #f63d67;
  height: 50px;
}

.center-shop {
  height: 50px;
  display: flex;
  font-size: 20px;
}

.center-menu {
  height: 150px;
  margin-top: 20px;
  font-family: 宋体;
  font-size: 17px;
}

.ss1 {
  background: #fafad0;
}

.ss2 {
  background: #bfea8a;
}

.ss3 {
  background: #ef90f8;
}

.ss4 {
  background: #f18a80;
}

.ss5 {
  background: #eedd74;
}
</style>
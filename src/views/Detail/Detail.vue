<template>
  <!--通过点击商品的图标，将vuex中的内容在此页面显示，在vuex中向数据库请求对应的数据-->
  <div class="detail">
    <div class="left">
      <img :src="require('@/assets/img/food/'+detailInfo.imgid+'.jpg')">
    </div>
    <div class="right">
      <div class="information">
        <span style="background-image: linear-gradient(to right,#da9070,#e3892c);-webkit-background-clip: text;
  color: transparent;font-size: 18px">{{ detailInfo.goodsname }}</span>
        <h2>{{ detailInfo.shopname + "(" + detailInfo.address + ")" }}</h2>
        <span style="color: #f5456e;font-size: 20px">￥{{ detailInfo.price }}</span>
      </div>
      <div class="comment">
        <h2>用户评价</h2>
        <span>用户001：该用户觉得商家服务态度很好</span>
      </div>
      <div class="pay">
        <div>
          <button @click="sub">-</button>
          <span style="color: #f5456e">{{ counter }}</span>
          <button @click="add">+</button>
          <span style="margin-left: 40px">本单应付:￥</span>
          <span style="color: red;">{{ price.toFixed(1) }}</span>
          <span style="margin-left: 40px">总共应付:￥</span>
          <span style="color: red;">{{ $store.state.totalPrice.toFixed(1) }}</span>
        </div>

        <div class="jiesuan">
          <div style="width: 100px;height: 50px;background-color: red;
          line-height: 50px;text-align: center;color: white" @click="addCar">加入购物车
          </div>
          <div
              style="width: 100px;height: 50px;background-color: red;
              line-height: 50px;text-align: center;margin-left: 20px;color: white" @click="payAll">去结算
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Detail",
  data() {
    return {
      goodsid: '',
      detailInfo: [],
      counter: 1
    }
  },
  computed: {
    price() {
      return this.counter * this.detailInfo.price;
    }
  },
  created() {
    this.goodsid = this.$route.query.goodsid;
    this.getDetail(this.goodsid);
  },
  methods: {
    getDetail(goodsid) {
      for (let i = 0; i < this.$store.state.information.length; i++) {
        if (goodsid === this.$store.state.information[i].goodsid) {
          this.detailInfo = this.$store.state.information[i];
          break;
        }
      }
    },
    getPrice() {
      var price = this.price;
      this.$store.commit({type: 'getprice', price});
    },
    sub() {
      if (this.counter > 1)
        this.counter--;
    },
    add() {
      this.counter++;
    },
    addCar() {
      if(this.$store.state.userid==='')
      {
        this.$router.push('/profile');
      }
      else{
        this.getPrice()
        axios({
          method: 'post',
          url: this.HOST + "purchase/insertPurchase",
          data: {
            goodsid: this.goodsid,
            userid: this.$store.state.userid,
            shopid: this.detailInfo.shopid,
            counter: this.counter,
            send: 'no',
            pay: 'no'
          }
        }).then(res => {
          if(res.data===true){
            alert('添加购物车成功');
          } else {
            alert('添加购物车失败');
          }
        }).catch(err => {
          alert('服务器连接失败，请重试');
        })
      }
    },
    payAll() {
     if(this.$store.state.userid===''){
       this.$router.push('/profile');
     }
     else{
       this.getPrice()
       axios({
         method: 'post',
         url: this.HOST + "purchase/insertPurchase",
         data: {
           goodsid: this.goodsid,
           userid: this.$store.state.userid,
           shopid: this.detailInfo.shopid,
           counter: this.counter,
           send: 'no',
           pay: 'no'
         }
       }).then(res =>{
         if(res.data===true){
           alert('正在前往订单页面结算');
         } else {
           alert('出错了！！！');
         }
       }).catch(err => {
         alert('服务器连接失败，请重试');
       })
       this.$router.push({path: '/order', query: {goodsid: this.goodsid}});
     }


    }
  }
}
</script>

<style scoped>
.detail {
  margin: auto;
  height: 800px;
  width: 800px;
  background-image: linear-gradient(to right, #a7ece2, #c9f3b9);
  border-radius: 20px 20px;
  display: flex;
}

.detail .left {
  width: 400px;
  height: 400px;
}

.detail .left img {
  height: 400px;
  width: 400px;
}

.detail .right {
  height: 800px;
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.pay {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.comment {
  height: 200px;
}

.information {
  height: 200px;
}

.jiesuan {
  height: 200px;
  width: 250px;
  display: flex;
  margin-top: 20px;
}
</style>
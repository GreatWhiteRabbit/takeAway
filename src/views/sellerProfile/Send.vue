<template>
  <div>
    <div class="bar">
      <div class="mainbody" v-for="(item,index) in Info" :class="bgc[index%5]">
        <div class="left">
          <img :src="require('@/assets/img/food/'+item.imgid+'.jpg')">
        </div>
        <div class="center">
          <div class="center-shop">
            <span>{{"用户："+ item.userid }}</span>
            <span style="margin-left: 20px">{{item.counter+"份"}}</span>
          </div>
          <div class="center-menu">
            <span>{{ item.goodsname }}</span>
          </div>
        </div>
        <div class="right">
          <div class="right-price">
            <span>{{ "￥" + item.price*item.counter }}</span>
          </div>
          <div v-if="item.send==='no'">
            <button style="color: white;background: #ea5353;border: 0px" @click="send(index)">通知配送</button>
          </div>
          <div v-else>
            <span>小哥配送中</span>
          </div>
        </div>
      </div>
    </div>
    <div class="Noshow"></div>
  </div>

</template>

<script>
import ShopBar from "@/components/common/ShopBar/ShopBar";
import axios from "axios";

export default {
  name: "Send",
  components: {ShopBar},
  data() {
    return {
      bgc: ['ss1', 'ss2', 'ss3', 'ss4', 'ss5'],
      Info: [
        {
          imgid:'',
          userid:'',
          counter:'',
          send:'',
          price:'',
          goodsname:''
        }
      ],
      Infotemp:{
        imgid:'',
        userid:'',
        counter:'',
        send:'',
        price:'',
        goodsname:''
      }
    }
  },
  created() {
  this.getAllPurchase();
    this.getInfo();
  },
  methods: {
    getInfo() {
      for(let i=0;i<this.$store.state.allPurchase.length;i++){
        for(let j=0;j<this.$store.state.memuInfo.length;j++){
            if(this.$store.state.allPurchase[i].shopid===this.$store.state.memuInfo[j].shopid
                &&this.$store.state.allPurchase[i].goodsid===this.$store.state.memuInfo[j].goodsid
                &&this.$store.state.allPurchase[i].pay==='yse'){
              this.Infotemp.imgid=this.$store.state.allPurchase[i].goodsid;
              this.Infotemp.userid=this.$store.state.allPurchase[i].userid;
              this.Infotemp.counter=this.$store.state.allPurchase[i].counter;
              this.Infotemp.send=this.$store.state.allPurchase[i].send;
              this.Infotemp.price=this.$store.state.memuInfo[j].price;
              this.Infotemp.goodsname=this.$store.state.memuInfo[j].goodsname;
              this.Info.push(this.Infotemp);
              this.Infotemp=[];
            }
        }
      }
      this.Info.splice(0,1);
      console.log(this.Info);
    },
    getAllPurchase() {
      axios({
        method:'get',
        url:this.HOST+"purchase/getAllPurchase",
      }).then(res => {
        this.$store.state.allPurchase=res.data;
      }).catch(err => {
        alert('服务器连接失败，请重试')
      })
    },
    send(index){
      axios({
        method:'post',
        url:this.HOST+"purchase/updateSendPurchase",
        data:{
          goodsid:this.Info[index].imgid,
          userid:this.Info[index].userid,
          counter:this.Info[index].counter,
          send:'yes',
          shopid:this.$store.state.sellerid,
          pay:'yse'
        }
      }).then(res => {
        if(res.data===true)
        {
          alert('通知小哥成功')
        } else{
          alert('暂无小哥接单，请稍后')
        }
      }).catch(err =>{
        alert('连接服务器失败，请重试')
      })
    }
  }
}
</script>

<style scoped>
.Noshow{
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 48px;
  width: 880px;
  background-color: rgba(250, 250, 250, 0.99);
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
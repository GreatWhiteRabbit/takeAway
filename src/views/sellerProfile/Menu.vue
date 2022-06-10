<template>
  <div>
    <div class="bar">
      <div class="mainbody" v-for="(item,index) in Info" :class="bgc[index%5]">
        <div class="left">
          <img :src="require('@/assets/img/food/'+item.imgid+'.jpg')">
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
            <span>{{ "￥" + item.price }}</span>
          </div>
          <div>
            <button style="color: white;background: #ea5353;border: 0px" @click="deleteMenu(index)">删除</button>
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
  name: "Menu",
  components: {ShopBar},
  data() {
    return {
      bgc: ['ss1', 'ss2', 'ss3', 'ss4', 'ss5'],
      Info: []
    }
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.Info = this.$store.state.memuInfo;
    },
    deleteMenu(index) {
      console.log(this.Info[index]);
      axios({
        method: 'post',
        url: this.HOST + "information/deleteMenu",
        data: {
          price: this.Info[index].price,
          address: this.Info[index].address,
          goodsname: this.Info[index].goodsname,
          shopname: this.Info[index].shopname,
          shopid: this.Info[index].shopid,
          imgid: this.Info[index].imgid,
          goodsid: this.Info[index].goodsid
        }
      }).then(res => {
        if (res.data === true) {
          alert('删除成功');
          this.updataInfo();
        } else {
          alert('删除失败');
        }
      }).catch(err => {
        alert('删除操作服务器连接失败，请重试');
      })
    },
    //删除操作后需要将数据库中的内容更新
    updataInfo() {
      axios({
        method: 'get',
        url: this.HOST + "information/sellerGetInfo",
        params: {
          shopid: this.$store.state.sellerid
        }
      }).then(res => {
        this.$store.state.memuInfo = res.data;
        this.getInfo();
      }).catch(err => {
        alert('更新操作连接服务器失败，请重试')
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
  background-color: rgba(248, 248, 246, 0.99);
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
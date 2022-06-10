<template>
  <div class="menu">
    <div class="item" v-for="(item,index) in imgdata" @click="getClassify(2*(index+1)+1)">
      <img :src=item.url alt="picture">
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import mainShopBar from "@/components/content/MainShopBar/MainShopBar";

export default {
  name: "GoodsClassify",
  data() {
    return {
      imgdata: [
        {url: require('@/assets/img/classify/icon-test.svg'), title: '甜品'},
        {url: require('@/assets/img/classify/shuiguo.svg'), title: '水果'},
        {url: require('@/assets/img/classify/xianhuasudi-.svg'), title: '鲜花速递'},
        {url: require('@/assets/img/classify/yaopin.svg'), title: '医药'}
      ],
    }
  },
  methods: {
    getClassify(index) {
      axios({
        method: 'get',
        url: this.HOST + "information/classify",
        params: {
          shopid1:'0'+'0'+index.toString(),
          shopid2:'0'+'0'+(index+1).toString()
        }
      }).then(res=>{
         this.$store.state.information=res.data;
         this.$router.push('/main');
      })
    },

  }
}
</script>

<style scoped>
.menu {
  height: 150px;
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fffff3;
  border-radius: 20px 20px;
}

.menu .item {
  height: 150px;
  width: 150px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu .item img {
  width: 100px;
  height: 100px;
}
</style>
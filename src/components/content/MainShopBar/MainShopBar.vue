<template>
<!--  此组件需要的功能是当刷新或者是搜索时，里面的内容能够发生变化-->
<div class="bar" >
  <ShopBar v-for="(item,index) in Info" :goodsid=item.goodsid :class="bgc[index%5]">
  <template v-slot:left>
<img :src="require('@/assets/img/food/'+item.imgid+'.jpg')">
  </template>
    <template v-slot:center >
      <div class="center-shop">
        <span>{{item.shopname}}</span>
        <span>{{"("+item.address+")"}}</span>
      </div>
      <div class="center-menu">
        <span>{{item.goodsname}}</span>
      </div>
    </template>
    <template v-slot:right>
      <div class="right-price">
        <span>{{"￥"+item.price}}</span>
      </div>
    </template>
  </ShopBar>
</div>
</template>

<script>
import ShopBar from "@/components/common/ShopBar/ShopBar";
import axios from "axios";
export default {
  name: "MainShopBar",
  components: {ShopBar},
  data(){
    return{
      bgc:['ss1','ss2','ss3','ss4','ss5'],
      Info:[],
    }
  },
  created(){
    this.getInfo();
  },
  methods:{
    getInfo(){
      var arr=this.getRandomArr(10,0,49);
      if(this.$store.state.information.length>=40)
      {
        for(let i = 0 ;i<arr.length;i++){
          this.Info.push(this.$store.state.information[arr[i]]);
        }
      }
      else
        this.Info=this.$store.state.information;
    },
     random(min,max){
  return Math.floor((max-min+1)*Math.random())+min;
},
     getRandomArr(len,start,end){
  let arr=[];
  while (arr.length<len){
    let num=this.random(start,end);
    if(arr.indexOf(num)==-1){
      arr.push(num);
    }
  }
  return arr;
}
  }
}
</script>

<style scoped>
.bar{
  display: flex;
  flex-wrap: wrap;
}
img{
  height: 100%;
  width: 100%;
}
.right-price{
  font-size: 22px;
  color: #f63d67;
}
.center-shop{
  display: flex;
  font-size: 20px;
}
.center-menu{
  margin-top: 20px;
  font-family: 宋体;
  font-size: 17px;
}
.ss1{
  background: #fafad0;
}
.ss2{
  background: #bfea8a;
}
.ss3{
  background: #ef90f8;
}
.ss4{
  background: #f18a80;
}
.ss5{
  background: #eedd74;
}
</style>
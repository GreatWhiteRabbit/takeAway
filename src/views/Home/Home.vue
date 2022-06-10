<template>
<div class="home">
  <nav-bar/>
  <goods-classify/>
  <reconmend/>
  <div style="margin-left: 40px">
    <span>
      <h2>店铺</h2>
    </span>
  </div>
  <main-shop-bar/>

</div>
</template>

<script>
import NavBar from "@/components/content/NavBar/NavBar";
import GoodsClassify from "@/components/content/GoodsClassify/GoodsClassify";
import Reconmend from "@/components/content/Reconmend/Reconmend";
import MainShopBar from "@/components/content/MainShopBar/MainShopBar";
import axios from "axios";
export default {
  name: "Home",
  components: {MainShopBar, Reconmend, GoodsClassify, NavBar},

}
</script>

<style scoped>
.home{
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}
</style>
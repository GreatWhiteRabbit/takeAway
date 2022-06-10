<template>
<div class="bar">

    <tab-bar path="/home">
      <template v-slot:icon >
        <img src="@/assets/img/icon/shouye.svg" alt="首页">
      </template>
      <template v-slot:icon-active>
        <img src="@/assets/img/icon-active/shouye.svg" alt="首页">
      </template>
      <template v-slot:item>
        <span>首页</span>
      </template>
    </tab-bar>

  <tab-bar path="/order">
    <template v-slot:icon >
      <img src="@/assets/img/icon/gouwuche.svg" alt="订单">
    </template>
    <template v-slot:icon-active >
      <img src="@/assets/img/icon-active/gouwuche.svg" alt="订单">
    </template>
    <template v-slot:item>
      <span>订单</span>
    </template>
  </tab-bar>


    <tab-bar path="/profile" >
      <template v-slot:icon >
        <img src="@/assets/img/icon/wode.svg" alt="我的" >
      </template>
      <template v-slot:icon-active >
        <img src="@/assets/img/icon-active/wode.svg" alt="我的"  >
      </template>
      <template v-slot:item>
        <span>我的</span>
      </template>
    </tab-bar>

</div>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
export default {
  name: "MainBar",
  components: {TabBar},
    methods:{

}
}
</script>

<style scoped>

.bar{
  position:fixed;
  bottom: 0;
  display: flex;
  right: 0;
  left: 0;
  box-shadow: 1px 1px 1px 1px rgb(200,200,200);
  background-color: #ffffff;
}

</style>
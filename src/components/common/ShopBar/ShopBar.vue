<template>

    <div class="shop-bar" @click="itemClick()" >
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>

</template>

<script>
export default {
  name: "ShopBar",
  props:{
    goodsid:String
  },
  methods:{
    itemClick() {
    this.$router.push({path:'/detail',query:{goodsid:this.goodsid}});
    }
  }
}
</script>

<style scoped>
.shop-bar{
  height: 150px;
  margin-left: 100px;
  display: flex;
  border-radius: 15px 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
 .left,.right{
  height: 150px;
  width: 200px;
   justify-content: center;
   align-items: center;
   display: flex;
}
.center{
  height: 100px;
  width: 250px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
a{
  text-decoration: none;
}
</style>
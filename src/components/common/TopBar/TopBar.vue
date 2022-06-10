<template>
<div class="topbar">
  <div class="left">
    <slot name="left">
    </slot>
  </div>
  <div class="center">
    <slot name="center">

    </slot>
  </div>
  <div class="right">
    <slot name="right">

    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: "TopBar"
}
</script>

<style scoped>
.topbar{
  background-image: linear-gradient(To right, #ee7979, #ef9f9f, #eca7a7);
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #f3f3f3;
  line-height: 50px;
}
.center{
  flex: 1;
  align-items: center;
}
.left,.right{
  height: 50px;
  width: 100px;
  align-items: center;
}
</style>
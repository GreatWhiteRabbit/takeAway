<template>
    <div class="tab-bar-item" @click="itemClick">
      <div>
        <slot v-if="!isActive" name="icon"></slot>
        <slot v-else name="icon-active"></slot>
      </div>
      <div :class="{active:isActive}">
        <slot name="item"></slot>
      </div>
    </div>

</template>

<script>
export default {
  name: "TabBar",
  props:{
    path:String
  },
  computed:{
    isActive(){
      return !this.$route.path.indexOf(this.path);
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path);
    }
  }
}
</script>

<style scoped>
.active{
  color: #ff0000;
}
.tab-bar-item{
  flex-direction: column;
 margin-left: 15%;
  justify-content: center;
 flex: 1;
}
img{
  height: 30px;
  width: 30px;
  margin-bottom: -4px;
}
</style>
<template>
  <div id="app">
    <main-bar></main-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import MainBar from "@/components/content/MainBar/MainBar";
import axios from "axios";
export default {
  name: 'App',
  components: {
    MainBar
  },
  created() {
    this.getALL();
  },
  methods:{
    getALL(){
      axios({
        method:"post",
        url:this.HOST+"information/selectAll"
      }).then(res =>{
        this.$store.state.information=res.data;
      })
    }
  }
}
</script>

<style>
@import "assets/CSS/base.css";
</style>

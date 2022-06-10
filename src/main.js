import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from "@/store/store";

Vue.config.productionTip = false
Vue.prototype.HOST='/api'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

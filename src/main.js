import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueHead from "vue-head";
import BootstrapVue from "bootstrap-vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueHead);
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

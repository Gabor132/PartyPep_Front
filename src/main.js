import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
// TODO: Replace the bellow import with more specific ones to avoid unneccessary imports
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

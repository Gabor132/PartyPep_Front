import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueHead from "vue-head";
import BootstrapVue from "bootstrap-vue";
// TODO: Replace the bellow import with more specific ones to avoid unneccessary imports
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
//import "vue-material/dist/theme/default.css";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueHead);
Vue.use(BootstrapVue);
Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import "./javascript/auth.js";

Notification.requestPermission(function(status){
  console.log("Notification permission status: ", status);
});

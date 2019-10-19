import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name:"mute-default",
      redirect: "/mute"
    },
    {
      path: "/mute",
      name: "mute",
      component: () => import("./views/Mute.vue")
    }
  ]
});

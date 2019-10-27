import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/events"
    },
    {
      path: "/mute",
      name: "mute",
      component: () => import("./views/Mute.vue")
    }
  ]
});

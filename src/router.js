import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "events",
      component: () => import("./views/MyEvents.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./views/MyEvents.vue")
    },
    {
      path: "/peps",
      name: "peps",
      component: () => import("./views/MyPeps.vue")
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/MyMessages.vue")
    }
  ]
});

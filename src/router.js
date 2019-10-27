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
      path: "/groups",
      name: "groups",
      component: () => import("./views/MyGroups.vue")
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/MyMessages.vue")
    }
  ]
});

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/events",
      meta: {
        title: process.env.VUE_APP_TITLE
      }
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./views/MyEvents.vue")
    },
    {
      path: "/peps",
      name: "peps",
      props: { default: true },
      component: () => import("./views/MyPeps.vue")
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/MyMessages.vue")
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("./views/MyGroups.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue")
    },
    {
      path: "/requests",
      name: "requests",
      component: () => import("./views/dev/Requests.vue")
    }
  ]
});

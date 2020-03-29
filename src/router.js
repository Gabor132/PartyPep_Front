import Vue from "vue";
import Router from "vue-router";
import Store from "./store";

Vue.use(Router);

const ifNotAuthenticated = function(to, from, next) {
  if (!Store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/events");
};
const ifAuthenticated = function(to, from, next) {
  if (Store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  //mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
      meta: {
        title: process.env.VUE_APP_TITLE
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register.vue"),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/events",
      name: "events",
      component: () => import("./views/MyEvents.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/peps",
      name: "peps",
      component: () => import("./views/MyPeps.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/MyMessages.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("./views/MyGroups.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/profile",
      name: "profile",
      props: {
        user: Store.getters.getUser
      },
      component: () => import("./views/Profile.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/pepmessage",
      name: "pepmessage",
      component: () => import("./views/PepMessage.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/devtools",
      name: "devtools",
      component: () => import("./views/dev/DevTools.vue"),
      beforeEnter: ifAuthenticated
    }
  ]
});

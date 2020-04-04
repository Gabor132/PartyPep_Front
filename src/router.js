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
      component: () => import("./views/Events.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/peps",
      name: "peps",
      component: () => import("./views/Peps.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("./views/Messages.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("./views/Groups.vue"),
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
      component: () => import("./views/Profile.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/group",
      name: "group",
      component: () => import("./views/Group.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/pepmessage",
      name: "pepmessage",
      component: () => import("./views/PepMessage.vue"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/addevent",
      name: "addevent",
      component: () => import("./views/details/AddEvent"),
      beforeEnter: ifAuthenticated
    },
    {
      path: "/canismoke",
      name: "canismoke",
      component: () => import("./views/CanISmoke"),
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

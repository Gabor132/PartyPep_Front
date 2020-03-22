----------------------------Template----------------------------------------------
<template>
  <md-app class="md-waterfall">
    <md-app-toolbar class="md-large md-primary">
      <peptitlebar :user="user" />
      <pepnavbar />
    </md-app-toolbar>
    <md-app-drawer :md-active="this.$store.getters.showMenu" md-swipeable>
      <pepnavdrawer :user="user" />
    </md-app-drawer>
    <md-app-content>
      <pepcontent />
    </md-app-content>
    <md-bottom-bar md-sync-route>
      <md-bottom-bar-item
        to="/components/bottom-bar"
        exact
        md-label="Home"
        md-icon="home"
      ></md-bottom-bar-item>
      <md-bottom-bar-item
        to="/components/bottom-bar/posts"
        md-label="Posts"
        md-icon="/assets/icon-whatshot.svg"
      ></md-bottom-bar-item>
      <md-bottom-bar-item
        to="/components/bottom-bar/favorites"
        md-label="Favorites"
        md-icon="favorite"
      ></md-bottom-bar-item>
    </md-bottom-bar>
  </md-app>
</template>
----------------------------Style----------------------------------------------
<script>
//
// Imports
import pepcontent from "@/components/PepContent.vue";
import pepnavbar from "@/components/PepNavBar.vue";
import peptitlebar from "@/components/PepTitleBar.vue";
import pepnavdrawer from "@/components/PepNavDrawer.vue";
import axios from "axios";
import Store from "./store";

//
// Setup of #app
export default {
  name: "app",
  meta: {
    title: process.env.VUE_APP_TITLE,
    bodyScript: [
      {
        src: "https://unpkg.com/vue"
      },
      {
        src: "https://unpkg.com/vue-material"
      }
    ]
  },
  data: () => ({
    user: Store.state.user
  }),
  methods: {
    showMenu() {
      this.$store.dispatch("TOGGLE_MENU");
    }
  },
  components: {
    pepcontent,
    peptitlebar,
    pepnavbar,
    pepnavdrawer
  },
  created: function() {
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch("AUTH_LOGOUT");
          // you can also redirect to /login if needed !
        }
        throw err;
      });
    });
  }
};
</script>
----------------------------Style----------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
@import "src/assets/scss/_theme.scss";
#app {
  font-family: "Roboto", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>

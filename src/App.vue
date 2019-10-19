----------------------------Template----------------------------------------------
<template>
  <md-app class="md-waterfall">
    <md-app-toolbar class="md-primary">
      <peptitlebar :global="global" :user="user"/>
      <!--<pepnavbar/> -->
    </md-app-toolbar>
    <md-app-drawer :md-active.sync="global.isMenuShown" md-swipeable>
      <pepnavdrawer :user="user"/>
    </md-app-drawer>
    <md-app-content>
      <pepcontent/>
    </md-app-content>
    <md-bottom-bar md-sync-route>
      <md-bottom-bar-item to="/components/bottom-bar" exact md-label="Home" md-icon="home"></md-bottom-bar-item>
      <md-bottom-bar-item to="/components/bottom-bar/posts" md-label="Posts" md-icon="/assets/icon-whatshot.svg"></md-bottom-bar-item>
      <md-bottom-bar-item to="/components/bottom-bar/favorites" md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>
    </md-bottom-bar>
  </md-app>
</template>
----------------------------Style----------------------------------------------
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-material"></script>
<script>
//
// Imports
import pepcontent from "@/components/PepContent.vue";
import pepnavbar from "@/components/PepNavBar.vue";
import peptitlebar from "@/components/PepTitleBar.vue";
import pepnavdrawer from "@/components/PepNavDrawer.vue";
//
// Setup of #app
export default {
  name: "app",
  meta: {
    title: "PartyPeps"
  },
  head: {
    link: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    }
  },
  data: () => ({
    global: {
      isMenuShown : false
    },
    user: {
      age: 18,
      name: "Dragos",
      getAvatarText: function() {
        return this.name.charAt(0);
      }
    },
    peps: [
      {
        name: "Vasile"
      },
      {
        name: "Georgica"
      },
      {
        name: "Costel"
      }
    ]
  }),
  methods: {
    showMenu(){
      this.isMenuShown = ! this.isMenuShown;
    }
  },
  components: {
    pepcontent,
    peptitlebar,
    pepnavbar,
    pepnavdrawer
  }
};
</script>
----------------------------Style----------------------------------------------
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
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

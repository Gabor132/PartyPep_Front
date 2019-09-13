----------------------------Template----------------------------------------------
<template>
  <div id="app">
    <pepnavbar></pepnavbar>
    <div class="pepcontent">
      <router-view></router-view>
    </div>
    <pepfooter></pepfooter>
  </div>
</template>
----------------------------Style----------------------------------------------
<script>
//
// Imports
import pepnavbar from "@/components/PepNavBar.vue";
import pepfooter from "@/components/PepFooter.vue";
//
// Setup of #app
export default {
  head: {
    meta: {
      name: "viewport",
      content: "width=device-width, initial-scale=1, shrink-to-fit=no"
    }
  },
  components: {
    pepnavbar,
    pepfooter
  }
};
</script>
----------------------------Style----------------------------------------------
<style lang="scss">
@import "src/assets/scss/main.scss";
@import "src/assets/scss/_bootstrap.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}
.pepcontent {
  height: 100%;
}
</style>

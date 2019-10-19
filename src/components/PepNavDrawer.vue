<template>
  <div id="pepnavdrawer">
    <md-app-toolbar class="md-transparent" md-elevation="0">
      <div class="md-title">Mute-A-Lot</div>
    </md-app-toolbar>
    <md-divider/>
    <md-list>
      <md-list-item to="/profile">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">{{user.name + " " + "Profile"}}</span>
      </md-list-item>
      <md-list-item to="/about">
        <md-icon>help</md-icon>
        <span class="md-list-item-text">About</span>
      </md-list-item>
    </md-list>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepnavbar
export default {
  name: "pepnavdrawer",
  props: ["global", "user"]
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
</style>

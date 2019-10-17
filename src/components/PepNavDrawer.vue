<template>
  <div id="pepnavdrawer">
    <md-app-toolbar class="md-transparent" md-elevation="0">
      <div class="md-title">PartyPeps</div>
    </md-app-toolbar>
    <md-divider/>
    <md-list>
      <md-list-item v-if="isLoggedIn()" to="/profile">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">{{user.name + " " + "Profile"}}</span>
      </md-list-item>
      <md-list-item v-else to="/login">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">Login/Register</span>
      </md-list-item>
      <md-list-item to="/about">
        <md-icon>help</md-icon>
        <span class="md-list-item-text">About</span>
      </md-list-item>
      <md-list-item @click="doSmoke()">
        <md-icon>smoke_free</md-icon>
        <span class="md-list-item-text">Smoke?</span>
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
  props: ["global", "user"],
  methods: {
    isLoggedIn: function(){
      return true;
      //return auth_namespace.checkLoggedIn();
    },
    doSmoke: function(){
      alert("Do you wanna smoke?");
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
</style>

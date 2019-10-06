<template>
  <div id="pepnavdrawer">
    <md-app-toolbar class="md-transparent" md-elevation="0">
      <div class="md-title">PartyPeps</div>
    </md-app-toolbar>
    <md-list>
      <md-list-item to="/peps">
        <md-icon>emoji_people</md-icon>
        <span class="md-list-item-text">Peps</span>
      </md-list-item>
      <md-list-item to="/events">
        <md-icon>location_city</md-icon>
        <span class="md-list-item-text">Events</span>
      </md-list-item>
      <md-list-item to="/groups">
        <md-icon>group</md-icon>
        <span class="md-list-item-text">Groups</span>
      </md-list-item>
      <md-list-item to="/messages">
        <md-icon>chat</md-icon>
        <span class="md-list-item-text">Messages</span>
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
  props: ["global"]
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
</style>

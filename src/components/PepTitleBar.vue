<template>
  <div class="md-toolbar-row" id="peptitlebar">
    <md-button class="md-icon-button" @click="showMenu">
      <md-icon class="md-icon">menu</md-icon>
    </md-button>
    <!-- <span class="md-title titlefont" to="/">PartyPeps</span> -->
    <img class="titleimage" src="../../public/img/PartyPepsTitle2.png">
    <div class="md-toolbar-section-end">
      <md-button class="md-icon-button" @click="goToProfile">
        <md-avatar v-if="user !== null" class="md-avatar-icon">
          {{ user.name.charAt(0) }}</md-avatar
        >
        <md-icon v-else>person</md-icon>
      </md-button>
    </div>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepnavbar
export default {
  name: "peptitlebar",
  data: function() {
    return {
      user: this.$store.getters.getUser
    };
  },
  methods: {
    showMenu() {
      this.$store.dispatch("TOGGLE_MENU");
    },
    goToProfile() {
      this.$store.dispatch("SELECT_PEP", this.user);
      this.$router.push("/profile");
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>

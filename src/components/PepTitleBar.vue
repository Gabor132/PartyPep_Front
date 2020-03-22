<template>
  <div class="md-toolbar-row" id="peptitlebar">
    <md-button class="md-icon-button" @click="showMenu">
      <md-icon class="md-icon">menu</md-icon>
    </md-button>
    <span class="md-title" to="/">PartyPeps</span>
    <div class="md-toolbar-section-end">
      <md-button class="md-icon-button">
        <router-link to="/profile">
          <md-avatar v-if="user !== null" class="md-avatar-icon">
            {{ this.getAvatarText(user.name) }}</md-avatar
          >
          <md-icon v-else>person</md-icon>
        </router-link>
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
  props: ["user"],
  methods: {
    showMenu() {
      this.$store.dispatch("TOGGLE_MENU");
    },
    getAvatarText(name) {
      return name.charAt(0);
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>

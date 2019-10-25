<template>
  <div class="md-toolbar-row" id="peptitlebar">
    <md-button
      class="md-icon-button"
      @click="global.isMenuShown = !global.isMenuShown"
    >
      <md-icon class="md-icon">menu</md-icon>
    </md-button>
    <span class="md-title" to="/">PartyPeps</span>
    <div class="md-toolbar-section-end">
      <md-button class="md-icon-button">
        <md-avatar v-if="user !== undefined" class="md-avatar-icon">{{
          user.getAvatarText()
        }}</md-avatar>
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
  props: ["global", "user"],
  methods: {
    showMenu() {
      this.$emit("showMenuParent");
    },
    isLoggedIn() {
      this.user !== undefined;
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>

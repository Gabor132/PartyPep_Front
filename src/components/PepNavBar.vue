<template>
  <div id="pepheader">
    <b-navbar id="pepnavbar" toggleable="lg" type="dark" variant="dark">
      <div class="upper-header">
      <b-navbar-toggle target="nav-collapse" class="hamburger-menu"></b-navbar-toggle>
        <b-navbar-brand href="/">
          <h1 class="title">
            <router-link to="/">PartyPeps</router-link>
          </h1>
        </b-navbar-brand>
      </div>
      <b-collapse id="nav-collapse" class="lower-header" is-nav>
        <b-navbar-nav id="peplinks">
          <b-nav-item>
            <router-link to="/peps">
              MyPeps
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events">
              MyEvents
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/messages">
              MyMessages
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" id="pepuser">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepnavbar
export default {
  name: "pepnavbar"
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
//
// Import
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/pepnavbar.scss";

//
// Import BootstrapVue
@import "@/assets/scss/_bootstrap.scss";
</style>

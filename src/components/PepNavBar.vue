<template>
  <div class="md-toolbar-row md-toolbar-offset" id="pepnavbar">
    <md-tabs
      class="md-primary"
      md-alignment="centered"
      v-if="$store.getters.isAuthenticated && this.$isMobile()"
    >
      <md-tab
        id="tab-events"
        md-label="Events"
        to="/events"
      ></md-tab>
      <md-tab
        id="tab-peps"
        md-label="Peps"
        to="/peps"
      ></md-tab>
      <md-tab
        id="tab-groups"
        md-label="Groups"
        to="/groups"
      ></md-tab>
      <md-tab
        id="tab-messages"
        md-label="Messages"
        to="/messages"
      ></md-tab>
      <md-tab
        v-if="this.isDevelopment()"
        id="tab-requests"
        md-label="Dev Tools"
        to="/devtools"
      >
      </md-tab>
    </md-tabs>
    <md-tabs
      class="md-primary"
      md-alignment="centered"
      v-if="$store.getters.isAuthenticated && ! this.$isMobile()"
    >
      <md-tab
        id="tab-events"
        md-label="Events"
        to="/events"
        md-icon="local_bar"
      ></md-tab>
      <md-tab
        id="tab-peps"
        md-label="Peps"
        to="/peps"
        md-icon="emoji_people"
      ></md-tab>
      <md-tab
        id="tab-groups"
        md-label="Groups"
        to="/groups"
        md-icon="group"
      ></md-tab>
      <md-tab
        id="tab-messages"
        md-label="Messages"
        to="/messages"
        md-icon="chat"
      ></md-tab>
      <md-tab
        v-if="this.isDevelopment()"
        id="tab-requests"
        md-label="Dev Tools"
        to="/devtools"
        md-icon="build"
      >
      </md-tab>
    </md-tabs>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepnavbar
//
export default {
  name: "pepnavbar",
  methods: {
    isDevelopment: function() {
      return this.$store.getters.isDevelopment;
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
#pepnavbar {
  align-items: center;
}
</style>

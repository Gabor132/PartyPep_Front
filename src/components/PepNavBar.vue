<template>
  <div class="md-toolbar-row md-toolbar-offset" id="pepnavbar">
    <md-tabs class="md-primary" md-alignment="centered">
      <md-tab id="tab-events" md-label="Events" to="/events" md-icon="location_city">
      </md-tab>
      <md-tab id="tab-peps" md-label="Peps" to="/peps" md-icon="emoji_people">
      </md-tab>
      <md-tab id="tab-groups" md-label="Groups" to="/groups" md-icon="group">
      </md-tab>
      <md-tab id="tab-messages" md-label="Messages" to="/messages" md-icon="chat">
      </md-tab>
      <md-tab id="tab-messages" md-label="Requests" to="/requests" md-icon="chat">
      </md-tab>
    </md-tabs>
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
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
#pepnavbar{
  align-items: center;
}
</style>

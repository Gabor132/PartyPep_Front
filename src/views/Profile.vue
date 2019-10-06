<template>
  <div class="profile">
    <md-card>
      <md-card-header>
          <h1 class="md-title">Profile</h1>
      </md-card-header>
      <md-divider/>
      <md-card-content>
        <md-card>
          <md-card-header>
            <span class="md-title">Personal data</span>
          </md-card-header>
          <md-card-content>
            <p>Username: Dragos</p>
            <p>Firstname: </p>
            <p>Lastname: </p>
          </md-card-content>
          <md-card-actions>
            <md-button class="md-raised md-primary">Edit</md-button>
              <md-button class="md-raised md-primary">Change Password</md-button>
              <md-button class="md-raised md-primary">Deactivate Account</md-button>
          </md-card-actions>
        </md-card>
      </md-card-content>
    </md-card>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Local Setup
export default {
  name: "profile",
  props: ["user"]
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">


</style>

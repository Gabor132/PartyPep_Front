<template>
  <div class="canismoke">
    <md-card class="md-primary">
      <md-card-header>
        <h1 class="md-title">Can I Smoke?</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <md-empty-state
          md-icon="smoking_rooms"
          md-label="You wanna come in and go for a smoke?"
          md-description="Push the button to notify me"
        >
          <md-button class="md-primary md-raised" @click="pushNotification"
            >Notify Dragos</md-button
          >
        </md-empty-state>
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
import { RequestHandler } from "../javascript/requests";

export default {
  name: "canismoke",
  methods: {
    pushNotification: function() {
      RequestHandler.doGetRequest("/notification/notify/admin", {}).then(
        data => {
          // eslint-disable-next-line no-console
          console.log("Success:" + data);
        }
      );
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

<template>
  <div class="peps">
    <md-card class="mainCard">
      <md-card-header>
        <h1 class="md-title">My Peps</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <md-card v-for="pep in peps" v-bind:key="pep.id" md-with-hover>
          <md-ripple>
            <md-card-header>
              <md-card-header-text>
                <span class="md-title">{{ pep.name }}</span>
              </md-card-header-text>
              <md-card-media class="md-medium">
                <img
                  v-if="pep.picture !== undefined"
                  src="https://vuematerial.io/assets/examples/card-weather.png"
                  alt="Un Boss"
                />
                <md-icon v-else class="md-size-5x">person</md-icon>
              </md-card-media>
            </md-card-header>
            <md-card-content> </md-card-content>
            <md-card-actions>
              <md-button class="md-primary">
                Profile
              </md-button>
              <md-button class="md-primary">
                Message
              </md-button>
              <md-button class="md-primary">
                Unfollow
              </md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </md-card-content>
    </md-card>
    <md-button class="md-fab md-fab-bottom-right md-fixed" md-ripple>
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import { RequestHandler } from "@/javascript/requests.js";

// Local Setup
export default {
  name: "peps",
  data: function() {
    return {
      peps: []
    };
  },
  mounted() {
    this.peps = this.updatePeps();
  },
  methods: {
    updatePeps: function() {
      RequestHandler.doGetRequest("/users/all", {}, this.$store.state).then(
        data => {
          this.peps = data;
        }
      );
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import "../assets/scss/main.scss";
</style>

<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(pep)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ pep.name }}</span>
          </md-card-header-text>
          <md-card-media class="md-medium" v-if="pep.showDetails">
            <img
              v-if="pep.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-size-5x">person</md-icon>
          </md-card-media>
          <md-avatar v-else class="md-avatar-icon">
            <img
              v-if="pep.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-small">person</md-icon>
          </md-avatar>
        </md-card-header>
        <md-divider v-if="pep.showDetails" />
        <md-card-content v-if="pep.showDetails"> </md-card-content>
        <md-card-actions v-if="pep.showDetails">
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
    </div>
  </md-card>
</template>

<script>
/**
 * Imports
 */
//
/**
 * Exports
 */
export default {
  name: "pepcard",
  props: ["pep"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(pep) {
      pep.showDetails = !pep.showDetails;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped></style>

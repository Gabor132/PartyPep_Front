<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(group)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ group.name }}</span>
          </md-card-header-text>
          <md-card-media class="md-medium">
            <img
              v-if="group.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-size-5x">people</md-icon>
          </md-card-media>
          <md-button class="md-icon-button md-accent">
            <md-icon v-if="group.showDetails" class="md-size-2x"
              >keyboard_arrow_down</md-icon
            >
            <md-icon v-else class="md-size-2x">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-header>
        <md-divider v-if="group.showDetails" />
        <md-card-content v-if="group.showDetails">
          <span>Members: </span>
          <a
            to="/profile"
            v-for="user in group.usersUsernames"
            v-bind:key="user"
            class="md-with-hover"
            ><md-avatar class="md-avatar-icon"> {{ user.charAt(0) }}</md-avatar>
          </a>
        </md-card-content>
        <md-card-actions v-if="group.showDetails">
          <md-button class="md-primary">
            Messages
          </md-button>
          <md-button class="md-primary">
            Add Pep
          </md-button>
          <md-button class="md-primary">
            Get out
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
  name: "groupcard",
  props: ["group"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(group) {
      group.showDetails = !group.showDetails;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped></style>

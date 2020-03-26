<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(event)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ event.name }}</span>
          </md-card-header-text>
          <md-card-media class="md-medium" v-if="event.showDetails">
            <img
              v-if="event.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-size-4x">local_bar</md-icon>
          </md-card-media>
          <md-avatar v-else class="md-avatar-icon">
            <img
              v-if="event.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-small">local_bar</md-icon>
          </md-avatar>
        </md-card-header>
        <md-divider v-if="event.showDetails" />
        <md-card-content v-if="event.showDetails">
          <p>
            <md-icon class="md-small">location_on</md-icon> Location:
            {{ event.location }}
          </p>
          <p>
            <md-icon class="md-small">event</md-icon> Start of Event:
            {{ event.startOfEvent }}
          </p>
          <span
            ><md-icon class="md-small">people</md-icon> Invitees:
            <span v-if="event.invitedUsers.length === 0">None</span>
          </span>
          <div v-if="event.invitedUsers.length > 0">
            <a
              to="/profile"
              v-for="user in event.invitedUsers"
              v-bind:key="user"
              md-with-hover
              >{{ user }}
            </a>
          </div>
        </md-card-content>
        <md-card-actions v-if="event.showDetails">
          <md-button class="md-primary">
            Subscribe
          </md-button>
          <md-button class="md-primary" @click="share">
            Share
          </md-button>
          <md-button class="md-primary">
            Hide
          </md-button>
        </md-card-actions>
      </md-ripple>
    </div>
  </md-card>
</template>

<script>
// eslint-disable-next-line no-console
/**
 * Imports
 */
//
/**
 * Exports
 */
export default {
  name: "eventcard",
  props: ["event"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(event) {
      event.showDetails = !event.showDetails;
      this.$forceUpdate();
    },
    share: function() {}
  }
};
</script>

<style scoped></style>

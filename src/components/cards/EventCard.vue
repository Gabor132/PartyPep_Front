<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(event)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ event.name }}</span>
          </md-card-header-text>
          <md-button class="md-icon-button md-accent">
            <md-icon v-if="event.showDetails" class="md-size-2x"
              >keyboard_arrow_down</md-icon
            >
            <md-icon v-else class="md-size-2x">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-header>
        <md-divider v-if="event.showDetails" />
        <md-card-content v-if="event.showDetails">
          <p>Location: {{ event.location }}</p>
          <p>Start of Event: {{ event.startOfEvent }}</p>
          <span
            >Invitees:
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
          <md-button class="md-primary">
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
    }
  }
};
</script>

<style scoped></style>

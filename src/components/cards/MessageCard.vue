<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(message)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">
              From
              <a>{{ message.sourceUsername }}</a>
              on
              <a>{{ message.groupName }}</a>
            </span>
          </md-card-header-text>
        </md-card-header>
        <md-divider v-if="message.showDetails" />
        <md-card-content v-if="message.showDetails">
          <p>{{ message.text }}</p>
        </md-card-content>
        <md-card-actions v-if="message.showDetails">
          <md-button class="md-primary">
            Reply
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
  name: "messagecard",
  props: ["message"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(message) {
      message.showDetails = !message.showDetails;
      this.$forceUpdate();
    }
  }
};
</script>

<style scoped></style>

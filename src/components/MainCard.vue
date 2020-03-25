<template>
  <md-card class="mainCard md-primary" md-with-hover>
    <div @click="toggleDetails()">
      <md-card-header>
        <md-card-header-text>
          <h1 class="md-title">{{ title }}</h1>
        </md-card-header-text>
        <md-button class="md-icon-button md-accent">
          <md-icon v-if="showDetails" class="md-size-2x"
            >keyboard_arrow_down</md-icon
          >
          <md-icon v-else class="md-size-2x">keyboard_arrow_right</md-icon>
        </md-button>
      </md-card-header>
    </div>
    <md-divider />
    <md-card-content v-if="showDetails">
      <div v-if="collection.length === 0">
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <div>{{ emptyText }}</div>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
      <div v-else>
        <slot name="secondaryCards"></slot>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: "MainCard",
  props: ["title", "emptyText", "collection"],
  data: function() {
    return {
      showDetails: false
    };
  },
  methods: {
    toggleDetails: function() {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>

<style scoped></style>

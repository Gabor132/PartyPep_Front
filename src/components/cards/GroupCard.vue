<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(group)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ group.name }}</span>
          </md-card-header-text>
          <md-card-media class="md-medium" v-if="group.showDetails">
            <img
              v-if="group.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-size-5x">people</md-icon>
          </md-card-media>
          <md-avatar v-else class="md-avatar-icon">
            <img
              v-if="group.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-small">people</md-icon>
          </md-avatar>
        </md-card-header>
        <md-divider v-if="group.showDetails" />
        <md-card-content v-if="group.showDetails">
          <span>Members: </span>
          <a
            v-for="user in group.usersUsernames"
            v-bind:key="user"
            class="md-with-hover"
            @click="goToProfilePage(user)"
            ><md-avatar class="md-avatar-icon"> {{ user.charAt(0) }}</md-avatar>
          </a>
        </md-card-content>
        <md-card-actions v-if="group.showDetails">
          <md-button class="md-primary" @click="goToGroupPage(group)">
            Messages
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
import { RequestHandler } from "../../javascript/requests";

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
    },
    goToProfilePage: async function(pepname) {
      let pep = await RequestHandler.doGetRequest("/users/" + pepname, {}).then(
        data => {
          return data;
        }
      );
      if (pep !== null) {
        await this.$store.dispatch("SELECT_PEP", pep);
        this.$router.push("/profile");
      }
    },
    goToGroupPage: function(group) {
      this.$store.dispatch("SELECT_GROUP", group);
      this.$router.push("/group");
    }
  }
};
</script>

<style scoped></style>

<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(pep)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ pep.name }}</span>
            <md-icon
              v-if="pepFollowsLoggedInUser(pep) && pep.canFollow"
              class="md-small"
              >emoji_people</md-icon
            >
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
        <md-card-content v-if="pep.showDetails">
          <span v-if="message.text">Value: {{ message.text }}</span>
        </md-card-content>
        <md-card-actions v-if="pep.showDetails">
          <md-button
            class="md-primary"
            :disabled="!pep.canViewProfile"
            @click="profile(pep)"
          >
            Profile
          </md-button>
          <md-button
            class="md-primary"
            :disabled="!pep.canMessage"
            @click.stop="writeMessage(pep)"
          >
            Message
          </md-button>
          <md-button
            class="md-primary"
            v-if="pep.canFollow"
            @click="follow(pep)"
          >
            Follow
          </md-button>
          <md-button class="md-primary" v-else @click="unfollow(pep)">
            Unfollow
          </md-button>
        </md-card-actions>
      </md-ripple>
    </div>
    <md-dialog-prompt
      :md-active.sync="pep.showMessagePrompt"
      v-model="message.text"
      md-title="Write message"
      md-input-maxlength="30"
      md-input-placeholder="Type your message..."
      md-confirm-text="Send"
    />
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
  name: "pepcard",
  props: ["pep", "mainPage"],
  data: function() {
    return {
      user: this.$store.getters.getUser,
      message: {
        text: "",
        receiver: ""
      }
    };
  },
  methods: {
    toggleEventDetails: function(pep) {
      pep.showDetails = !pep.showDetails;
      this.$forceUpdate();
    },
    writeMessage: function(pep) {
      this.message = {
        text: "",
        receiver: "Message to " + pep.name
      };
      pep.showMessagePrompt = true;
    },
    follow: function(pep) {
      RequestHandler.doPutRequest("/users/follow", pep.name).then(() => {
        this.reloadPep(pep);
      });
    },
    unfollow: function(pep) {
      RequestHandler.doDeleteRequest("/users/unfollow/" + pep.name, {}).then(
        () => {
          this.reloadPep(pep);
        }
      );
    },
    pepFollowsLoggedInUser(pep) {
      for (let index in pep.following) {
        if (pep.following[index] === this.user.name) {
          return true;
        }
      }
      return false;
    },
    reloadPep: async function(pep) {
      this.mainPage.reload(pep);
    },
    profile: function(pep) {
      this.$router.push("/profile/" + pep.name);
    }
  }
};
</script>

<style scoped></style>

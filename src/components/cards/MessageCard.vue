<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(message)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title" v-if="message.receiverUsername !== null">
              <a>{{ message.sourceUsername }}</a>
            </span>
            <span class="md-title" v-else>
              <a>{{ message.sourceUsername }}</a>
              on
              <a>{{ message.groupName }}</a>
            </span>
          </md-card-header-text>
          <md-card-media class="md-medium" v-if="message.showDetails">
            <md-icon class="md-size-5x">chat</md-icon>
          </md-card-media>
          <md-avatar v-else class="md-avatar-icon">
            <md-icon class="md-small">chat</md-icon>
          </md-avatar>
        </md-card-header>
        <md-divider v-if="message.showDetails" />
        <md-card-content v-if="message.showDetails">
          <p>{{ message.text }}</p>
        </md-card-content>
        <md-card-actions v-if="message.showDetails">
          <md-button
            class="md-primary"
            v-if="message.receiverUsername !== null"
            @click="goToPepMessagePage(message.sourceUsername)"
          >
            Reply to User
          </md-button>
          <md-button
            class="md-primary"
            v-else
            @click="goToGroupPage(message.groupName)"
          >
            Reply to Group
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
  name: "messagecard",
  props: ["message"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(message) {
      message.showDetails = !message.showDetails;
      if (message.showDetails === true && message.isRead === false) {
        this.markAsRead(message);
      }
      this.$forceUpdate();
    },
    markAsRead: function(message) {
      RequestHandler.doPostRequest("/messages/read", [message.id]).then(() => {
        message.isRead = true;
        this.$store.dispatch(
          "SET_UNREAD_MESSAGE",
          this.$store.getters.getNumberUnreadMessages - 1
        );
      });
    },
    goToPepMessagePage: async function(pepname) {
      let pep = await RequestHandler.doGetRequest("/users/" + pepname, {}).then(
        data => {
          return data;
        }
      );
      if (pep !== null) {
        await this.$store.dispatch("SELECT_PEP", pep);
        this.$router.push("pepmessage");
      }
    },
    goToGroupPage: async function(groupname) {
      let group = await RequestHandler.doGetRequest(
        "/groups/group/" + groupname,
        {}
      ).then(data => {
        return data;
      });
      if (group !== null) {
        await this.$store.dispatch("SELECT_GROUP", group);
        this.$router.push("/group");
      }
    }
  }
};
</script>

<style scoped></style>

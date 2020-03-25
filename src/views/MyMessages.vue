<template>
  <div id="messages">
    <md-card class="mainCard">
      <md-card-header>
        <h1 class="md-title">My Messages</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <div v-if="messages.length === 0">
          <md-card md-with-hover>
            <md-ripple>
              <md-card-content>
                <div>No Messages</div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        <div v-else>
          <md-card
            v-for="message in messages"
            v-bind:key="message.id"
            md-with-hover
          >
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
              <md-card-content>
                <p>{{ message.text }}</p>
              </md-card-content>
              <md-card-actions>
                <md-button class="md-primary">
                  Reply
                </md-button>
              </md-card-actions>
            </md-ripple>
          </md-card>
        </div>
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
// Setup view
import { RequestHandler } from "../javascript/requests";

export default {
  name: "messages",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      messages: []
    };
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    getMessages: function() {
      RequestHandler.doGetRequest("/messages/all", {}, this.$store.state)
        .then(data => {
          this.messages = data;
        })
        .catch(() => {
          return [];
        });
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style></style>

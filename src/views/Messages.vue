<template>
  <div id="messages">
    <maincard
      :collection="this.$store.getters.getMyPrivateMessages"
      :pageDetails="myPrivateMessagesPage"
    >
      <div
        class="md-main-card-holder"
        v-if="this.$store.getters.getMyPrivateMessages.length === 0"
      >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <md-empty-state
                md-icon="chat"
                md-label="No new messages"
                md-description="I guess no one is looking for you..."
              >
              </md-empty-state>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
      <div v-else>
        <messagecard
          v-for="message in this.$store.getters.getMyPrivateMessages"
          v-bind:key="message.id"
          :message="message"
        />
      </div>
    </maincard>
    <maincard
      :collection="this.$store.getters.getMyGroupMessages"
      :pageDetails="myGroupMessagesPage"
      ><div
        class="md-main-card-holder"
        v-if="this.$store.getters.getMyGroupMessages.length === 0"
      >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <md-empty-state
                md-icon="chat"
                md-label="No new group messages"
                md-description="Your gangs don't talk that much..."
              >
              </md-empty-state>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
      <div v-else>
        <messagecard
          v-for="message in this.$store.getters.getMyGroupMessages"
          v-bind:key="message.id"
          :message="message"
        />
      </div>
    </maincard>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Setup view
import maincard from "../components/cards/MainCard";
import messagecard from "../components/cards/MessageCard";
// Exports
export default {
  name: "messages",
  components: {
    maincard,
    messagecard
  },
  data: function() {
    return {
      user: this.$store.getters.getUser,
      myPrivateMessagesPage: {
        pageTitle: "My Private Messages",
        pageKey: 0,
        pageShowDetails: false,
        pageNoText: "No Private Messages"
      },
      myGroupMessagesPage: {
        pageTitle: "My Group Messages",
        pageKey: 1,
        pageShowDetails: false,
        pageNoText: "No Group Messages"
      }
    };
  },
  mounted() {
    this.$store.dispatch("GET_MY_PRIVATE_MESSAGES");
    this.$store.dispatch("GET_MY_GROUP_MESSAGES");
  },
  methods: {}
};
</script>
--------------------------------------------------------------------------------
<style></style>

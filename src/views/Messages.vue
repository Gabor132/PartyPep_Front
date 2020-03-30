<template>
  <div id="messages">
    <maincard
      :collection="this.$store.getters.getMyPrivateMessages"
      :pageDetails="myPrivateMessagesPage"
    >
      <messagecard
        v-for="message in this.$store.getters.getMyPrivateMessages"
        v-bind:key="message.id"
        :message="message"
      />
    </maincard>
    <maincard
      :collection="this.$store.getters.getMyGroupMessages"
      :pageDetails="myGroupMessagesPage"
    >
      <messagecard
        v-for="message in this.$store.getters.getMyGroupMessages"
        v-bind:key="message.id"
        :message="message"
      />
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

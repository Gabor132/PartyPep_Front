<template>
  <div id="messages">
    <maincard
      :collection="messages"
      :title="myMessagesTitle"
      :emptyText="noMessagesText"
    >
      <template>
        <messagecard
          v-for="message in messages"
          v-bind:key="message.id"
          :message="message"
        />
      </template>
    </maincard>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Setup view
import { RequestHandler } from "../javascript/requests";
import maincard from "../components/cards/MainCard";
import messagecard from "../components/cards/MessageCard";

export default {
  name: "messages",
  components: {
    maincard,
    messagecard
  },
  data: function() {
    return {
      user: this.$store.getters.getUser,
      messages: [],
      myMessagesTitle: "My Messages",
      noMessagesText: "No messages"
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
          for (let index in this.messages) {
            this.messages[index].showDetails = false;
          }
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

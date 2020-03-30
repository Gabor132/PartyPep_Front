<template>
  <div class="pepMessage">
    <md-card class="mainCard md-primary" md-with-hover>
      <div>
        <md-card-header>
          <md-card-header-text>
            <h3 class="md-title">{{ pep.name }}</h3>
            <span> chat page </span>
          </md-card-header-text>
          <md-card-media class="md-medium">
            <img
              v-if="this.checkPicture()"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-size-5x">person</md-icon>
          </md-card-media>
        </md-card-header>
        <md-divider />
        <md-card-actions>
          <md-button @click="goToProfilePage">Profile</md-button>
        </md-card-actions>
      </div>
    </md-card>
    <md-card class="mainCard md-primary" md-with-hover>
      <div>
        <md-card-header>
          <md-card-header-text>
            <h3 class="md-title">Messages</h3>
          </md-card-header-text>
        </md-card-header>
      </div>
      <md-divider />
      <md-card-content>
        <pepchat :messages="conversation"></pepchat>
      </md-card-content>
    </md-card>
    <md-card md-with-hover>
      <form class="writeMessage" @submit.prevent="sendMessage">
        <md-icon>conversation</md-icon>
        <md-field>
          <md-input
            name="newMessage"
            id="newMessage"
            autocomplete=""
            v-model="newMessage"
            required
          />
        </md-field>
        <md-button type="submit" class="md-primary md-raised">Send</md-button>
      </form>
    </md-card>
  </div>
</template>

<script>
import { RequestHandler } from "../javascript/requests";
import pepchat from "../components/PepChat";

export default {
  name: "pepmessage",
  components: {
    pepchat: pepchat
  },
  data: function() {
    return {
      newMessage: "",
      user: this.$store.getters.getUser,
      pep: this.$store.getters.getSelectedPep,
      conversation: []
    };
  },
  messages: [],
  mounted: async function() {
    await this.getConversationMessages();
    this.markAsRead();
  },
  methods: {
    checkPicture: function() {
      return this.user.picture !== undefined;
    },
    getConversationMessages: async function() {
      return await RequestHandler.doGetRequest("/messages/private/user/" + this.pep.name, {})
        .then(data => {
          this.conversation = data;
          return this.conversation;
        })
        .catch(() => {
          this.conversation.push({});
          return this.conversation;
        });
    },
    sendMessage: function() {
      RequestHandler.doPostRequest("/messages/add", {
        id: null,
        text: this.newMessage,
        sourceUsername: this.user.name,
        receiverUsername: this.pep.name,
        groupName: null,
        isRead: false
      }).then(() => {
        this.getConversationMessages();
        this.newMessage = "";
      });
    },
    goToProfilePage: function() {
      this.$store.dispatch("SELECT_PEP", this.pep);
      this.$router.push("/profile");
    },
    markAsRead: function() {
      let toMarkChat = [];
      let toMarkChatIds = [];
      for (let index in this.conversation) {
        if (!this.conversation[index].isRead && this.conversation[index].receiverUsername === this.user.name) {
          toMarkChat.push(this.conversation[index]);
          toMarkChatIds.push(this.conversation[index].id);
        }
      }
      if (toMarkChatIds.length > 0) {
        RequestHandler.doPostRequest("/messages/read", toMarkChatIds).then(
          () => {
            for (let index in toMarkChat) {
              toMarkChat[index].isRead = true;
            }
          }
        );
      }
    }
  }
};
</script>
<style scoped></style>

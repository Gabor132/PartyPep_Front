<template>
  <div class="group">
    <md-card class="md-primary">
      <md-card-header>
        <md-card-header-text>
          <h3 class="md-title">{{ group.name }}</h3>
          <span> group page </span>
        </md-card-header-text>
        <md-card-media class="md-medium">
          <img
            v-if="group.picture !== undefined"
            src="https://vuematerial.io/assets/examples/card-weather.png"
            alt="Un Boss"
          />
          <md-icon v-else class="md-size-5x">people</md-icon>
        </md-card-media>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <md-card-area>
          <span>Members: </span>
          <a
            v-for="user in group.usersUsernames"
            v-bind:key="user"
            class="md-with-hover"
            @click="goToProfilePage(user)"
            ><md-avatar class="md-avatar-icon"> {{ user.charAt(0) }}</md-avatar>
          </a>
        </md-card-area>
      </md-card-content>
      <md-card-actions>
        <md-button>
          Add Pep
        </md-button>
        <md-button>
          Get out
        </md-button>
      </md-card-actions>
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
// Imports
import pepchat from "../components/PepChat";
import { RequestHandler } from "../javascript/requests";
// Exports
export default {
  name: "Group",
  components: {
    pepchat: pepchat
  },
  data: function() {
    return {
      user: this.$store.getters.getUser,
      group: this.$store.getters.getSelectedGroup,
      newMessage: "",
      conversation: []
    };
  },
  mounted() {
    this.getConversationMessages();
    this.markAsRead();
  },
  methods: {
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
    getConversationMessages: function() {
      RequestHandler.doGetRequest(
        "/messages/group/group/" + this.group.name,
        {}
      )
        .then(data => {
          this.conversation = data;
        })
        .catch(() => {
          this.conversation.push({});
        });
    },
    sendMessage: function() {
      RequestHandler.doPostRequest("/messages/add", {
        id: null,
        text: this.newMessage,
        sourceUsername: this.user.name,
        receiverUsername: null,
        groupName: this.group.name,
        isRead: false
      }).then(() => {
        this.getConversationMessages();
        this.newMessage = "";
      });
    },
    markAsRead: function() {
      let toMarkChat = [];
      let toMarkChatIds = [];
      for (let index in this.conversation) {
        if (
          !this.conversation[index].isRead &&
          this.conversation[index].receiverUsername === this.user.name
        ) {
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

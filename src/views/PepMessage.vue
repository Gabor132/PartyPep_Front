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
      <div>
        <md-card-content>
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
            <md-button
              type="submit"
              class="md-primary md-raised"
              >Send</md-button
            >
          </form>
        </md-card-content>
      </div>
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
  mounted() {
    this.getConversationMessages();
  },
  methods: {
    checkPicture: function() {
      return this.user.picture !== undefined;
    },
    getConversationMessages: function() {
      RequestHandler.doGetRequest("/messages/private/user/" + this.pep.name, {})
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
        receiverUsername: this.pep.name,
        groupName: null,
        isRead: false
      }).then(() => {
        this.getConversationMessages();
        this.newMessage = "";
      });
    }
  }
};
</script>
<style scoped></style>

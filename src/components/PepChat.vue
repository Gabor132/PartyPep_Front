<template>
  <div id="pepchat">
    <div v-for="message in messages" v-bind:key="message.id" class="pepMessageCardContainer">
      <md-card class="pepMessageCard" md-with-hover>
        <div>
          <md-card-header>
            <md-card-header-text>
              <p v-if="isFromMe(message)" class="myPepMessage">{{ message.sourceUsername }} | {{ message.text }}</p>
              <p v-else class="hisPepMessage">{{ message.sourceUsername }} | {{ message.text }}</p>
            </md-card-header-text>
          </md-card-header>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "pepchat",
  props: ["messages"],
  data: function() {
    return {
      user: this.$store.getters.getUser,
      newMessage: ""
    };
  },
  methods: {
    isFromMe: function(message) {
      return message.sourceUsername === this.user.name;
    }
  }
};
</script>

<style scoped></style>

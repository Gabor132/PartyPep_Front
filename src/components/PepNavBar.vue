<template>
  <div class="md-toolbar-row md-toolbar-offset" id="pepnavbar">
    <md-tabs
      class="md-primary"
      md-alignment="centered"
      v-if="$store.getters.isAuthenticated && this.$isMobile()"
    >
      <template slot="md-tab" slot-scope="{ tab }">
        <span class="md-tab-label">{{ tab.label }}</span>
        <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
      </template>
      <md-tab id="tab-events" md-label="Events" to="/events"></md-tab>
      <md-tab id="tab-peps" md-label="Peps" to="/peps"></md-tab>
      <md-tab id="tab-groups" md-label="Groups" to="/groups"></md-tab>
      <md-tab
        id="tab-messages"
        md-label="Messages"
        to="/messages"
        :md-template-data="{ badge: numberOfUnreadMessages }"
        @click="clearUnreadBadge()"
      ></md-tab>
      <md-tab
        v-if="this.isDevelopment()"
        id="tab-requests"
        md-label="Dev Tools"
        to="/devtools"
      >
      </md-tab>
    </md-tabs>

    <md-tabs
      class="md-primary"
      md-alignment="centered"
      v-if="$store.getters.isAuthenticated && !this.$isMobile()"
    >
      <template slot="md-tab" slot-scope="{ tab }">
        <md-icon class="md-icon md-icon-font md-tab-icon md-theme-default">{{
          tab.icon
        }}</md-icon>
        <span class="md-tab-label">{{ tab.label }}</span>
        <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
      </template>
      <md-tab
        id="tab-events"
        md-label="Events"
        to="/events"
        md-icon="local_bar"
      ></md-tab>
      <md-tab
        id="tab-peps"
        md-label="Peps"
        to="/peps"
        md-icon="emoji_people"
      ></md-tab>
      <md-tab
        id="tab-groups"
        md-label="Groups"
        to="/groups"
        md-icon="group"
      ></md-tab>
      <md-tab
        id="tab-messages"
        md-label="Messages"
        md-icon="chat"
        :md-template-data="{ badge: numberOfUnreadMessages }"
        @click="toMessages"
      >
      </md-tab>
      <md-tab
        v-if="this.isDevelopment()"
        id="tab-requests"
        md-label="Dev Tools"
        to="/devtools"
        md-icon="build"
      >
      </md-tab>
    </md-tabs>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepnavbar
//
import { RequestHandler } from "../javascript/requests";

export default {
  name: "pepnavbar",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      numberOfUnreadMessages: this.$store.getters.getNumberUnreadMessages
    };
  },
  methods: {
    isDevelopment: function() {
      return this.$store.getters.isDevelopment;
    },
    mounted() {
      this.getNumberUnreadMessages();
    },
    getNumberUnreadMessages: async function() {
      let number = await RequestHandler.doGetRequest(
        "/messages/all/unread/number",
        {}
      ).then(data => {
        return data;
      });
      await this.$store.dispatch("SET_UNREAD_MESSAGE", number);
    },
    clearUnreadBadge: function() {
      this.getNumberUnreadMessages();
      this.numberOfUnreadMessages = this.$store.getters.getNumberOfUnreadMessages;
    },
    toMessages: function() {
      this.$router.push("/messages");
      this.clearUnreadBadge();
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

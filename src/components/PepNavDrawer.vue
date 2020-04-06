<template>
  <div id="pepnavdrawer">
    <md-app-toolbar class="md-transparent" md-elevation="0">
      <md-button class="md-icon-button" @click="hideDrawer">
        <md-icon class="md-icon">arrow_back</md-icon>
      </md-button>
      <img
        class="drawerTitleImage"
        src="../../public/img/PartyPepsTitleReverse.png"
      />
    </md-app-toolbar>
    <md-divider />
    <md-list>
      <md-list-item @click="goToProfile()" v-if="isAuthenticated()">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">{{
          user.name + "'s " + "profile"
        }}</span>
      </md-list-item>
      <md-list-item to="/about" @click="hideDrawer">
        <md-icon>help</md-icon>
        <span class="md-list-item-text">About</span>
      </md-list-item>
      <md-list-item @click="logout" v-if="isAuthenticated()">
        <md-icon>no_meeting_room</md-icon>
        <span class="md-list-item-text">Logout</span>
      </md-list-item>
      <md-list-item @click="goToCanISmoke" v-if="isAuthenticated() && isPushNotificationsActive">
        <md-icon>smoking_rooms</md-icon>
        <span class="md-list-item-text">Can I Smoke?</span>
      </md-list-item>
      <md-list-item
        @click="subscribeForCanISmoke"
        v-if="isAuthenticated() && isDragos() && !isSubscribed && isPushNotificationsActive"
      >
        <md-icon>smoking_rooms</md-icon>
        <span class="md-list-item-text"
          >Allow Notifications for Can I Smoke</span
        >
      </md-list-item>
    </md-list>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepnavbar
import {
  checkSubscription,
  subscribeNotifications
} from "../registerServiceWorker";
import { RequestHandler } from "../javascript/requests";

export default {
  name: "pepnavdrawer",
  props: ["global"],
  data: function() {
    return {
      user: this.$store.getters.getUser,
      isSubscribed: false,
      isPushNotificationsActive: this.$store.getters.isPushNotificationsActive
    };
  },
  async beforeMount() {
    if(this.isPushNotificationsActive){
      this.isSubscribed = await checkSubscription();
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.hideDrawer();
        this.$router.go();
      });
    },
    goToCanISmoke: function() {
      this.hideDrawer();
      this.$router.push("canismoke");
    },
    hideDrawer: function() {
      this.$store.dispatch("TOGGLE_MENU");
    },
    goToProfile: function() {
      this.hideDrawer();
      this.$store.dispatch("SELECT_PEP", this.user);
      this.$router.push("/profile");
    },
    isAuthenticated: function() {
      return this.$store.getters.isAuthenticated;
    },
    isDragos: function() {
      return this.user.name === "admin";
    },
    subscribeForCanISmoke: async function() {
      this.hideDrawer();
      let subscription = await subscribeNotifications();
      let data = subscription.toJSON();
      await RequestHandler.doPostRequest("/notification/add", {
        endpointUrl: data.endpoint,
        p256dh: data.keys.p256dh,
        auth: data.keys.auth
      }).then(() => {
        // eslint-disable-next-line no-console
        console.log("Success");
      });
      this.$forceUpdate();
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");
</style>

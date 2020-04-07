import format from "date-fns/format";
<template>
  <md-card md-with-hover class="md-card-secondary">
    <div @click="toggleEventDetails(event)">
      <md-ripple>
        <md-card-header>
          <md-card-header-text>
            <span class="md-title">{{ event.name }}</span>
          </md-card-header-text>
          <md-card-media class="md-medium" v-if="event.showDetails">
            <img
              v-if="event.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-size-4x">local_bar</md-icon>
          </md-card-media>
          <md-avatar v-else class="md-avatar-icon">
            <img
              v-if="event.picture !== undefined"
              src="https://vuematerial.io/assets/examples/card-weather.png"
              alt="Un Boss"
            />
            <md-icon v-else class="md-small">local_bar</md-icon>
          </md-avatar>
        </md-card-header>
        <md-divider v-if="event.showDetails" />
        <md-card-content v-if="event.showDetails">
          <p>
            <md-icon class="md-small">person</md-icon> Event Creator:
            {{ event.creationUser }}
          </p>
          <p>
            <md-icon class="md-small">event</md-icon> Start of Event:
            {{ formatDate(event.startOfEvent) }}
          </p>
          <p>
            <md-icon class="md-small">location_on</md-icon> Location:
            {{ event.location }}
          </p>
          <span
            ><md-icon class="md-small">people</md-icon> Subscribed Users:
            <span v-if="event.subscribedUsers.length === 0">None</span>
          </span>
          <div v-if="event.subscribedUsers.length > 0">
            <a
              v-for="user in event.subscribedUsers"
              v-bind:key="user"
              @click="goToProfilePage(user)"
              ><md-avatar class="md-avatar-icon" md-with-hover>
                {{ user.charAt(0) }}</md-avatar
              >
            </a>
          </div>
        </md-card-content>
        <md-card-actions v-if="event.showDetails">
          <md-button
            class="md-primary"
            v-if="event.canSubscribe"
            @click="subscribe(event)"
          >
            Subscribe
          </md-button>
          <md-button class="md-primary" v-else @click="unsubscribe(event)">
            Unsubscribe
          </md-button>
          <md-button class="md-primary" @click="share">
            Share
          </md-button>
          <md-button
            class="md-primary"
            v-if="event.canDelete"
            @click="deleteEvent(event)"
          >
            Delete
          </md-button>
        </md-card-actions>
      </md-ripple>
    </div>
  </md-card>
</template>

<script>
// eslint-disable-next-line no-console
/**
 * Imports
 */
//
import { RequestHandler } from "../../javascript/requests";
import format from "date-fns/format";
/**
 * Exports
 */
export default {
  name: "eventcard",
  props: ["event", "mainPage"],
  data: function() {
    return {};
  },
  methods: {
    toggleEventDetails: function(event) {
      event.showDetails = !event.showDetails;
      this.$forceUpdate();
    },
    share: function() {},
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
    subscribe: async function(event) {
      await RequestHandler.doPutRequest("/events/subscribe", event.id).then(
        () => {
          this.reloadPep(event);
        }
      );
      await this.$store.dispatch("GET_EVENT", event);
    },
    unsubscribe: async function(event) {
      await RequestHandler.doDeleteRequest(
        "/events/unsubscribe/" + event.id
      ).then(() => {
        this.reloadPep(event);
      });
      await this.$store.dispatch("GET_EVENT", event);
    },
    deleteEvent: async function(event) {
      await RequestHandler.doDeleteRequest("/events/delete/" + event.id).then(
        () => {
          this.mainPage.reload(event, true);
        }
      );
    },
    reloadPep: async function(event) {
      this.mainPage.reload(event);
    },
    formatDate: function(date){
      return format(Date.parse(date), "yyyy-MM-dd HH:mm");
    }
  }
};
</script>

<style scoped></style>

----------------------------Template----------------------------------------------
<template>
  <div class="events">
    <maincard :pageDetails="myEventsPage" :key="myEventsPage.pageKey">
      <div
        class="md-main-card-holder"
        v-if="this.$store.getters.getMyEvents.length === 0"
      >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <md-empty-state
                md-icon="local_bar"
                md-label="Create an event"
                md-description="Creating an event and invite your Peps"
              >
                <md-button class="md-primary md-raised" @click="goToAddEvent"
                  >Create event</md-button
                >
              </md-empty-state>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
      <div v-else>
        <eventcard
          v-for="event in this.$store.getters.getMyEvents"
          v-bind:key="event.id"
          :mainPage="mainPage"
          :event="event"
        ></eventcard>
      </div>
    </maincard>
    <maincard
      :pageDetails="allEventsPage"
      :key="allEventsPage.pageKey"
    >
      <div
        class="md-main-card-holder"
        v-if="this.$store.getters.getAllEvents.length === 0"
      >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <md-empty-state
                md-icon="local_bar"
                md-label="Create an event"
                md-description="Creating an event and invite your Peps"
              >
                <md-button class="md-primary md-raised" @click="goToAddEvent"
                  >Create event</md-button
                >
              </md-empty-state>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
      <div v-else>
        <eventcard
          v-for="event in this.$store.getters.getAllEvents"
          v-bind:key="event.id"
          :mainPage="mainPage"
          :event="event"
        />
      </div>
    </maincard>
    <md-button
      class="md-fab md-small md-primary md-fab-bottom-right"
      @click="goToAddEvent"
    >
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>
// Imports
import maincard from "../components/cards/MainCard.vue";
import eventcard from "../components/cards/EventCard.vue";
// Exports
export default {
  name: "events",
  components: {
    maincard: maincard,
    eventcard: eventcard
  },
  data: function() {
    return {
      mainPage: this,
      user: this.$store.getters.getUser,
      allEventsPage: {
        pageTitle: "All Events",
        pageKey: 0,
        pageShowDetails: false,
        pageNoText: "No Events",
        empty_template_name: "empty" + this.pageKey
      },
      myEventsPage: {
        pageTitle: "Subscribed Events",
        pageKey: 1,
        pageShowDetails: false,
        pageNoText: "No Events"
      }
    };
  },
  mounted() {
    this.$store.dispatch("GET_ALL_EVENTS");
    this.$store.dispatch("GET_MY_EVENTS");
  },
  methods: {
    reload: function(event) {
      this.$store.dispatch("GET_EVENT", event);
    },
    goToAddEvent: function() {
      this.$router.push("addevent");
    }
  }
};
</script>

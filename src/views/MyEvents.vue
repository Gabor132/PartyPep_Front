----------------------------Template----------------------------------------------
<template>
  <div class="events">
    <maincard :collection="myEvents" :pageDetails="myEventsPage">
      <eventcard
        v-for="event in myEvents"
        v-bind:key="event.id"
        :event="event"
      ></eventcard>
    </maincard>
    <maincard :collection="allEvents" :pageDetails="allEventsPage">
      <eventcard
        v-for="event in allEvents"
        v-bind:key="event.id"
        :event="event"
      />
    </maincard>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>
import { RequestHandler } from "../javascript/requests";
import maincard from "../components/cards/MainCard.vue";
import eventcard from "../components/cards/EventCard.vue";
export default {
  name: "events",
  components: {
    maincard: maincard,
    eventcard: eventcard
  },
  data: function() {
    return {
      user: this.$store.getters.getUser,
      allEventsPage: {
        pageTitle: "All Events",
        pageKey: 0,
        pageShowDetails: false,
        pageNoText: "No Events"
      },
      myEventsPage: {
        pageTitle: "My Events",
        pageKey: 1,
        pageShowDetails: false,
        pageNoText: "No Events"
      },
      allEvents: [],
      myEvents: []
    };
  },
  mounted() {
    this.getAllEvents();
    this.getMyEvents();
  },
  methods: {
    getAllEvents: function() {
      RequestHandler.doGetRequest("/events/all", {})
        .then(data => {
          this.allEvents = data;
          for (let index in this.allEvents) {
            this.allEvents[index].showDetails = false;
          }
        })
        .catch(() => {
          return [];
        });
    },
    getMyEvents: function() {
      RequestHandler.doGetRequest("/events/myevents", {})
        .then(data => {
          this.myEvents = data;
          for (let index in this.myEvents) {
            this.myEvents[index].showDetails = false;
          }
        })
        .catch(() => {
          return [];
        });
    }
  }
};
</script>

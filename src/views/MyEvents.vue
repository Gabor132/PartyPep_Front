----------------------------Template----------------------------------------------
<template>
  <div class="events">
    <maincard
      name="maincard"
      :collection="myEvents"
      :title="myEventsTitle"
      :emptyText="noEventsText"
    >
      <eventcard
        v-for="event in myEvents"
        v-bind:key="event.id"
        :event="event"
      ></eventcard>
    </maincard>
    <maincard
      :collection="allEvents"
      :title="allEventsTitle"
      :emptyText="noEventsText"
    >
      <eventcard
        v-for="event in allEvents"
        v-bind:key="event.id"
        :event="event"
      />
    </maincard>
    <pepsbottombar></pepsbottombar>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>
import { RequestHandler } from "../javascript/requests";
import maincard from "../components/cards/MainCard.vue";
import eventcard from "../components/cards/EventCard.vue";
import pepsbottombar from "../components/PepsBottomBar";
export default {
  name: "events",
  components: {
    pepsbottombar: pepsbottombar,
    maincard: maincard,
    eventcard: eventcard
  },
  data: function() {
    return {
      user: this.$store.getters.getUser,
      allEvents: [],
      myEvents: [],
      allEventsTitle: "All Events",
      myEventsTitle: "My Events",
      noEventsText: "No Events",
      showDetails: false
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    getEvents: function() {
      RequestHandler.doGetRequest("/events/all", {}, this.$store.state)
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
    toggleDetails: function() {
      this.showDetails = !this.showDetails;
    },
    toggleEventDetails: function(event) {
      event.showDetails = !event.showDetails;
      this.$forceUpdate();
    }
  }
};
</script>

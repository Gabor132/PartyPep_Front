----------------------------Template----------------------------------------------
<template>
  <div class="events">
    <maincard
      :collection="this.$store.getters.getMyEvents"
      :pageDetails="myEventsPage"
    >
      <eventcard
        v-for="event in this.$store.getters.getMyEvents"
        v-bind:key="event.id"
        :event="event"
      ></eventcard>
    </maincard>
    <maincard
      :collection="this.$store.getters.getAllEvents"
      :pageDetails="allEventsPage"
    >
      <eventcard
        v-for="event in this.$store.getters.getAllEvents"
        v-bind:key="event.id"
        :event="event"
      />
    </maincard>
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
      }
    };
  },
  mounted() {
    this.$store.dispatch("GET_ALL_EVENTS");
    this.$store.dispatch("GET_MY_EVENTS");
  },
  methods: {}
};
</script>

----------------------------Template----------------------------------------------
<template>
  <div class="events">
    <md-card class="mainCard md-primary" md-with-hover>
      <div @click="toggleDetails()">
        <md-card-header>
          <md-card-header-text>
            <h1 class="md-title">All Events</h1>
          </md-card-header-text>
          <md-button class="md-icon-button md-accent">
            <md-icon v-if="showDetails" class="md-size-2x"
              >keyboard_arrow_down</md-icon
            >
            <md-icon v-else class="md-size-2x">keyboard_arrow_right</md-icon>
          </md-button>
        </md-card-header>
      </div>
      <md-divider />
      <md-card-content v-if="showDetails">
        <div v-if="events.length === 0">
          <md-card md-with-hover>
            <md-ripple>
              <md-card-content>
                <div>No Events</div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        <div v-else>
          <md-card
            v-for="event in events"
            v-bind:key="event.id"
            md-with-hover
            class="md-card-secondary"
          >
            <div @click="toggleEventDetails(event)">
              <md-ripple>
                <md-card-header>
                  <md-card-header-text>
                    <span class="md-title">{{ event.name }}</span>
                  </md-card-header-text>
                  <md-button class="md-icon-button md-accent">
                    <md-icon v-if="event.showDetails" class="md-size-2x"
                      >keyboard_arrow_down</md-icon
                    >
                    <md-icon v-else class="md-size-2x"
                      >keyboard_arrow_right</md-icon
                    >
                  </md-button>
                </md-card-header>
                <md-divider v-if="event.showDetails" />
                <md-card-content v-if="event.showDetails">
                  <p>Location: {{ event.location }}</p>
                  <p>Start of Event: {{ event.startOfEvent }}</p>
                  <span
                    >Invitees:
                    <span v-if="event.invitedUsers.length === 0">None</span>
                    <div v-else>
                      <a
                        to="/profile"
                        v-for="user in event.invitedUsers"
                        v-bind:key="user"
                        md-with-hover
                        >{{ user }}
                      </a>
                    </div>
                  </span>
                </md-card-content>
                <md-card-actions v-if="event.showDetails">
                  <md-button class="md-primary">
                    Subscribe
                  </md-button>
                  <md-button class="md-primary">
                    Share
                  </md-button>
                  <md-button class="md-primary">
                    Hide
                  </md-button>
                </md-card-actions>
              </md-ripple>
            </div>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>
import { RequestHandler } from "../javascript/requests";

export default {
  name: "events",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      events: [],
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
          this.events = data;
          for (let index in this.events) {
            this.events[index].showDetails = false;
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

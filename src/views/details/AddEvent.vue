<template>
  <div class="addevent">
    <addingpage :title="title">
      <md-card-content>
        <md-card>
          <md-card-content>
            <form>
              <form class="addevent" @submit.prevent="addEvent">
                <md-field>
                  <label for="eventName">Event Name</label>
                  <span class="md-prefix"><md-icon>local_bar</md-icon></span>
                  <md-input
                    name="eventName"
                    id="eventName"
                    autocomplete="Event Name"
                    v-model="newEvent.name"
                    required
                  />
                </md-field>
                <md-datepicker v-model="newEvent.startOfEvent">
                  <label>Select start of event</label>
                </md-datepicker>
                <md-field>
                  <label for="selectedHourTime">Hour</label>
                  <span class="md-prefix"><md-icon>schedule</md-icon></span>
                  <md-select
                    v-model="selectedHourTime"
                    name="selectedHourTime"
                    id="selectedHourTime"
                  >
                    <md-option
                      v-for="time in this.hourRange"
                      :value="time"
                      v-bind:key="time"
                      >{{ time }}</md-option
                    >
                  </md-select>
                </md-field>
                <md-field>
                  <label for="selectedMinuteTime">Minute</label>
                  <span class="md-prefix"><md-icon>schedule</md-icon></span>
                  <md-select
                    v-model="selectedMinuteTime"
                    name="selectedMinuteTime"
                    id="selectedMinuteTime"
                  >
                    <md-option
                      v-for="time in this.minuteRange"
                      :value="time"
                      v-bind:key="time"
                      >{{ time }}</md-option
                    >
                  </md-select>
                </md-field>
                <md-field>
                  <label for="location">Location of Event</label>
                  <span class="md-prefix"><md-icon>location_on</md-icon></span>
                  <md-input
                    name="location"
                    id="location"
                    v-model="newEvent.location"
                    required
                  />
                </md-field>
                <md-field v-if="myPeps.length > 0 || myGroups.length > 0">
                  <label for="invitationName">Invite</label>
                  <span class="md-prefix"><md-icon>people</md-icon></span>
                  <md-select
                    v-model="newEvent.subscribedUsers"
                    name="invitationName"
                    id="invitationName"
                    multiple
                  >
                    <md-optgroup label="Groups">
                      <md-option
                        v-for="group in this.myGroups"
                        :value="group.name"
                        v-bind:key="group.name"
                        v-bind:disabled="isOptionDisabled(group)"
                        >{{ group.name }}</md-option
                      >
                    </md-optgroup>

                    <md-optgroup label="Peps">
                      <md-option
                        v-for="pep in this.myPeps"
                        :value="pep.name"
                        v-bind:key="pep.name"
                        :disabled="isOptionDisabled(pep)"
                        >{{ pep.name }}</md-option
                      >
                    </md-optgroup>
                  </md-select>
                </md-field>
                <md-field v-else>
                  <label for="invitationName">Invite</label>
                  <md-select
                    v-model="newEvent.subscribedUsers"
                    name="invitationName"
                    id="invitationName"
                    :disabled="true"
                  >
                  </md-select>
                </md-field>
              </form>
            </form>
          </md-card-content>
        </md-card>
      </md-card-content>
      <md-card-actions>
        <md-button @click="createEvent">Create Event</md-button>
      </md-card-actions>
    </addingpage>
  </div>
</template>

<script>
import addingpage from "../../components/details/AddingPage";
import { RequestHandler } from "../../javascript/requests";
import format from "date-fns/format";
export default {
  name: "addevent",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      title: "Create Event",
      newEvent: {
        id: null,
        name: "",
        startOfEvent: format(new Date(), "yyyy-MM-dd"),
        creationUser: this.$store.getters.getUser.name,
        location: "",
        subscribedUsers: []
      },
      selectedHourTime: null,
      selectedMinuteTime: null,
      myPeps: this.$store.getters.getMyPeps,
      myGroups: this.$store.getters.getMyGroups,
      hourRange: this.getTimeHourRange(),
      minuteRange: this.getTimeMinuteRange()
    };
  },
  components: {
    addingpage: addingpage
  },
  beforeMount() {
    this.$store.dispatch("GET_ALL_PEPS");
    this.$store.dispatch("GET_MY_PEPS");
    this.$store.dispatch("GET_MY_GROUPS", this.user.id);
  },
  methods: {
    getTimeHourRange: function() {
      let range = [];
      for (let time = 0; time < 24; time++) {
        if (time < 10) {
          range.push("0" + time);
        } else {
          range.push("" + time);
        }
      }
      return range;
    },
    getTimeMinuteRange: function() {
      let range = [];
      for (let time = 0; time < 60; time++) {
        if (time < 10) {
          range.push("0" + time);
        } else {
          range.push("" + time);
        }
      }
      return range;
    },
    isOptionDisabled: function(pep_group) {
      for (let index in this.newEvent.subscribedUsers) {
        if (this.newEvent.subscribedUsers[index].name === pep_group.name) {
          return true;
        }
      }
    },
    createEvent: function() {
      let date = new Date(Date.parse(this.newEvent.startOfEvent));
      date.setHours(parseInt(this.selectedHourTime));
      date.setMinutes(parseInt(this.selectedMinuteTime));
      this.newEvent.startOfEvent = format(date, "yyyy-MM-dd HH:mm:ss.SSS");
      RequestHandler.doPostRequest("/events/add", this.newEvent).then(() => {
        this.$router.push("events");
      });
    }
  }
};
</script>

<style scoped></style>

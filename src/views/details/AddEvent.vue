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
export default {
  name: "addevent",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      title: "Create Event",
      newEvent: {
        id: null,
        name: "",
        startOfEvent: null,
        location: "",
        subscribedUsers: []
      },
      myPeps: this.$store.getters.getMyPeps,
      myGroups: this.$store.getters.getMyGroups
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
    addEvent: function() {},
    isOptionDisabled: function(pep_group) {
      for (let index in this.newEvent.subscribedUsers) {
        if (this.newEvent.subscribedUsers[index].name === pep_group.name) {
          return true;
        }
      }
    },
    createEvent: function() {}
  }
};
</script>

<style scoped></style>

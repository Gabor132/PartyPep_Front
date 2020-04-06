<template>
  <div class="addgroup">
    <addingpage :title="title">
      <md-card-content>
        <md-card>
          <md-card-content>
            <form>
              <form class="addgroup" @submit.prevent="addGroup">
                <md-field>
                  <label for="eventName">Group Name</label>
                  <span class="md-prefix"><md-icon>people</md-icon></span>
                  <md-input
                    name="groupName"
                    id="groupName"
                    autocomplete="Group Name"
                    v-model="newGroup.name"
                    required
                  />
                </md-field>
                <md-field v-if="myPeps.length > 0">
                  <label for="invitationName">Invite</label>
                  <span class="md-prefix"><md-icon>people</md-icon></span>
                  <md-select
                    v-model="newGroup.usersUsernames"
                    name="invitationName"
                    id="invitationName"
                    multiple
                  >
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
                    v-model="newGroup.usersUsernames"
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
        <md-button @click="createGroup">Create Group</md-button>
      </md-card-actions>
    </addingpage>
  </div>
</template>

<script>
import addingpage from "../../components/details/AddingPage";
import { RequestHandler } from "../../javascript/requests";
export default {
  name: "addgroup",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      title: "Create Event",
      newGroup: {
        id: null,
        name: "",
        usersUsernames: []
      },
      myPeps: this.$store.getters.getMyPeps
    };
  },
  components: {
    addingpage: addingpage
  },
  beforeMount() {
    this.$store.dispatch("GET_MY_PEPS");
  },
  methods: {
    isOptionDisabled: function(pep_group) {
      for (let index in this.newGroup.usersUsernames) {
        if (this.newGroup.usersUsernames[index] === pep_group.name) {
          return true;
        }
      }
    },
    createGroup: function() {
      this.newGroup.usersUsernames.push(this.user.name);
      RequestHandler.doPostRequest("/groups/add", this.newGroup).then(() => {
        this.$router.push("groups");
      });
    }
  }
};
</script>

<style scoped></style>

----------------------------Template----------------------------------------------
<template>
  <div class="groups">
    <md-card class="mainCard">
      <md-card-header>
        <h1 class="md-title">My Groups</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <div v-if="groups.length === 0">
          <md-card md-with-hover>
            <md-ripple>
              <md-card-content>
                <div>No Groups</div>
              </md-card-content>
            </md-ripple>
          </md-card>
        </div>
        <div v-else>
          <md-card v-for="group in groups" v-bind:key="group.id" md-with-hover>
            <md-ripple>
              <md-card-header>
                <md-card-header-text>
                  <span class="md-title">{{ group.name }}</span>
                </md-card-header-text>
              </md-card-header>
              <md-card-content>
                <span>Members: </span>
                <a to="/profile" v-for="user in group.users_usernames" v-bind:key="user" md-with-hover>{{user}}
                </a>
              </md-card-content>
              <md-card-actions>
                <md-button class="md-primary">
                  Messages
                </md-button>
                <md-button class="md-primary">
                  Add Pep
                </md-button>
                <md-button class="md-primary">
                  Get out
                </md-button>
              </md-card-actions>
            </md-ripple>
          </md-card>
        </div>
      </md-card-content>
    </md-card>
    <md-button class="md-fab md-fab-bottom-right md-fixed" md-ripple>
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>

  import {RequestHandler} from "../javascript/requests";

  export default {
  name: "groups",
  data: function() {
    return {
      user: this.$store.getters.getUser,
      groups: []
    };
  },
  mounted() {
    this.getGroups();
  },
  methods:{
    getGroups: function() {
      RequestHandler.doGetRequest("/groups/user/" + this.user.id, {}, this.$store.state).then((data) => {
        this.groups = data;
      }).catch(() => {
        return [];
      });
    }
  }
};
</script>

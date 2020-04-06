----------------------------Template----------------------------------------------
<template>
  <div class="groups">
    <maincard
      :collection="this.$store.getters.getMyGroups"
      :pageDetails="myGroupsPage"
    >
      <div
        class="md-main-card-holder"
        v-if="this.$store.getters.getMyGroups.length === 0"
      >
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <md-empty-state
                md-icon="people"
                md-label="You need a gang"
                md-description="Create a group and invite some friends"
              >
                <md-button class="md-primary md-raised" @click="goToAddGroup"
                  >Create group</md-button
                >
              </md-empty-state>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
      <div v-else>
        <groupcard
          v-for="group in this.$store.getters.getMyGroups"
          v-bind:key="group.id"
          :group="group"
        />
      </div>
    </maincard>
    <md-button
      class="md-fab md-small md-accent md-fab-bottom-right"
      @click="goToAddGroup"
    >
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>
import maincard from "../components/cards/MainCard";
import groupcard from "../components/cards/GroupCard";

export default {
  name: "groups",
  components: {
    maincard,
    groupcard
  },
  data: function() {
    return {
      user: this.$store.getters.getUser,
      myGroupsPage: {
        pageTitle: "My Groups",
        pageKey: 0,
        pageShowDetails: false,
        pageNoText: "No Groups"
      }
    };
  },
  mounted() {
    this.$store.dispatch("GET_MY_GROUPS", this.user.id);
  },
  methods: {
    goToAddGroup: function() {
      this.$router.push("addgroup");
    }
  }
};
</script>

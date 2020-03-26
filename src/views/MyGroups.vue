----------------------------Template----------------------------------------------
<template>
  <div class="groups">
    <maincard
      :collection="groups"
      :title="myGroupsTitle"
      :emptyText="noGroupsText"
    >
      <groupcard v-for="group in groups" v-bind:key="group.id" :group="group" />
    </maincard>
  </div>
</template>
----------------------------Script----------------------------------------------
<script>
import { RequestHandler } from "../javascript/requests";
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
      groups: [],
      myGroupsTitle: "My Groups",
      noGroupsText: "No Groups"
    };
  },
  mounted() {
    this.getGroups();
  },
  methods: {
    getGroups: function() {
      RequestHandler.doGetRequest(
        "/groups/user/" + this.user.id,
        {},
        this.$store.state
      )
        .then(data => {
          this.groups = data;
        })
        .catch(() => {
          return [];
        });
    }
  }
};
</script>

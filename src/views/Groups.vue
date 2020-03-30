----------------------------Template----------------------------------------------
<template>
  <div class="groups">
    <maincard
      :collection="this.$store.getters.getMyGroups"
      :pageDetails="myGroupsPage"
    >
      <groupcard
        v-for="group in this.$store.getters.getMyGroups"
        v-bind:key="group.id"
        :group="group"
      />
    </maincard>
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
  methods: {}
};
</script>

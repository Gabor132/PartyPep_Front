<template>
  <div class="peps">
    <maincard
      :collection="this.$store.getters.getMyPeps"
      :pageDetails="myPepsPage"
    >
      <pepcard
        v-for="pep in this.$store.getters.getMyPeps"
        :pep="pep"
        :mainPage="mainPage"
        v-bind:key="pep.id"
      />
    </maincard>
    <maincard
      :collection="this.$store.getters.getAllPeps"
      :pageDetails="allPepsPage"
    >
      <pepcard
        v-for="pep in this.$store.getters.getAllPeps"
        :pep="pep"
        :mainPage="mainPage"
        v-bind:key="pep.id"
      />
    </maincard>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import maincard from "../components/cards/MainCard";
import pepcard from "../components/cards/PepCard";
// Local Setup
export default {
  name: "peps",
  components: { pepcard, maincard },
  data: function() {
    return {
      mainPage: this,
      user: this.$store.getters.getUser,
      allPeps: [],
      myPeps: [],
      allPepsPage: {
        pageTitle: "All Peps",
        pageKey: 0,
        pageShowDetails: false,
        pageNoText: "No Peps"
      },
      myPepsPage: {
        pageTitle: "My Peps",
        pageKey: 1,
        pageShowDetails: false,
        pageNoText: "No Peps"
      }
    };
  },
  mounted() {
    this.$store.dispatch("GET_ALL_PEPS");
    this.$store.dispatch("GET_MY_PEPS");
  },
  methods: {
    reload: function(pep) {
      this.$store.dispatch("GET_PEP", pep);
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

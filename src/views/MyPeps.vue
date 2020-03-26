<template>
  <div class="peps">
    <maincard :collection="myPeps" :title="myPepsTitle" :emptyText="noPepsText">
      <pepcard v-for="pep in myPeps" v-bind:key="pep.id" :pep="pep" />
    </maincard>
    <maincard
      :collection="allPeps"
      :title="allPepsTitle"
      :emptyText="noPepsText"
    >
      <pepcard v-for="pep in allPeps" v-bind:key="pep.id" :pep="pep" />
    </maincard>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import { RequestHandler } from "../javascript/requests.js";
import maincard from "../components/cards/MainCard";
import pepcard from "../components/cards/PepCard";
// Local Setup
export default {
  name: "peps",
  components: { pepcard, maincard },
  data: function() {
    return {
      allPeps: [],
      myPeps: [],
      allPepsTitle: "All Peps",
      myPepsTitle: "My Peps",
      noPepsText: "No Peps"
    };
  },
  mounted() {
    this.allPeps = this.updatePeps();
  },
  methods: {
    updatePeps: function() {
      RequestHandler.doGetRequest("/users/all", {}, this.$store.state).then(
        data => {
          this.allPeps = data;
          for (let index in this.allPeps) {
            this.allPeps[index].showDetails = false;
          }
        }
      );
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

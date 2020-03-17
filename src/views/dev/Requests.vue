<template>
  <div id="requests">
    <md-card>
      <md-card-header>
        <span class="md-title">Test Requests</span>
      </md-card-header>
      <md-card-content>
        <form>
          <md-field>
            {{ apiUrl }}
          </md-field>
          <md-field>
            <label for="username">Username</label>
            <md-input name="username" id="username" v-model="form.username" />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input name="password" id="password" v-model="form.password" />
          </md-field>
          <md-button class="md-primary md-raised" @click="doTokenRequest()">
            Get Token
          </md-button>
          <md-button
            class="md-primary md-raised"
            @click="doTokenCheckRequest()"
          >
            Check Token
          </md-button>
          <md-button class="md-primary md-raised" @click="getAllUsers()">
            Get All Users
          </md-button>
          <md-button class="md-primary md-raised" @click="getClientId()">
            Get ClientId
          </md-button>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import { RequestHandler } from "@/javascript/requests.js";

// Local Setup
export default {
  name: "requests",
  data: function() {
    return {
      form: {
        url: "http://localhost:8080",
        username: "admin",
        password: "admin",
        parameters: {
          param1: ""
        }
      },
      apiUrl: process.env.VUE_APP_ROOT_API
    };
  },
  methods: {
    doTokenRequest: function() {
      RequestHandler._getToken(
        this.form.username,
        this.form.password,
        this.$store.state
      );
    },
    doTokenCheckRequest: function() {
      RequestHandler.doTokenCheck(this.$store.state);
    },
    getAllUsers: function() {
      RequestHandler.doGetRequest("/users/all", {}, this.$store.state);
    },
    getClientId: function() {
      RequestHandler._getClientCredentials(this.$store.state);
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

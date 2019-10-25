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
          <md-field>
            {{ clientId }}
          </md-field>
          <md-field>
            {{ apiKey }}
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
        </form>
        <p>
          Response:
          {{ response }}
        </p>
      </md-card-content>
    </md-card>

    <md-snackbar
      :md-position="snackBarProp.position"
      :md-duration="snackBarProp.duration"
      :md-active.sync="snackBarProp.showSnackbar"
      md-persistent
    >
      <span
        >{{ snackBarProp.error.status }}
        {{ snackBarProp.error.description }}</span
      >
      <md-button
        v-if="snackBarProp.isError"
        class="md-primary"
        @click="snackBarProp.showSnackbar = false"
        >Retry</md-button
      >
    </md-snackbar>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import {
  RequestHandler,
  AuthenticationData,
  BasicAuthorization
} from "@/javascript/requests.js";

// Local Setup
export default {
  name: "requests",
  data: function() {
    return {
      snackBarProp: {
        position: "center",
        duration: 4000,
        showSnackbar: false,
        isError: false,
        error: {
          status: "",
          description: ""
        }
      },
      form: {
        url: "http://localhost:8080",
        username: "admin",
        password: "admin",
        parameters: {
          param1: ""
        }
      },
      response: "",
      apiUrl: process.env.VUE_APP_ROOT_API,
      clientId: process.env.VUE_APP_API_CLIENT_ID,
      apiKey: process.env.VUE_APP_API_KEY
    };
  },
  methods: {
    doTokenRequest: function() {
      var response = RequestHandler.getOAuthToken(this);
      this.response = response;
    },
    doTokenCheckRequest: function() {
      RequestHandler.checkToken(this);
    },
    getAllUsers: function() {
      RequestHandler.doGetRequest("/users/all");
    }
  },
  mounted() {
    var basicAuthorization = BasicAuthorization(
      process.env.VUE_APP_API_CLIENT_ID,
      process.env.VUE_APP_API_KEY
    );
    var userAuthentication = AuthenticationData(
      "admin",
      "admin",
      process.env.VUE_APP_API_DEFAULT_GRANT_TYPE,
      process.env.VUE_APP_API_CLIENT_ID
    );
    RequestHandler.config(
      process.env.VUE_APP_ROOT_API,
      basicAuthorization,
      userAuthentication
    );
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

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
import { RequestHandler } from "@/javascript/requests.js";

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
      apiUrl: process.env.VUE_APP_ROOT_API
    };
  },
  methods: {
    doTokenRequest: function() {
      RequestHandler.getOAuthToken(
        this.form.username,
        this.form.password,
        this
      );
    },
    doTokenCheckRequest: function() {
      RequestHandler.checkToken(this);
    },
    getAllUsers: function() {
      RequestHandler.doGetRequest("/users/all");
    },
    getClientId: function() {
      RequestHandler.getClientID();
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

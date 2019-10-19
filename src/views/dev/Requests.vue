<template>
  <div id="requests">
    <md-card>
      <md-card-header>
        <span class="md-title">Test Requests</span>
      </md-card-header>
      <md-card-content>
        <form>
          <md-field>
            {{apiUrl}}
          </md-field>
            <md-field>
              <label for="username">Username</label>
              <md-input name="username" id="username" v-model="form.username"/>
            </md-field>
              <md-field>
                <label for="password">Password</label>
                <md-input name="password" id="password" v-model="form.password"/>
              </md-field>
              <md-field>
                {{clientId}}
              </md-field>
              <md-field>
                {{apiKey}}
              </md-field>
          <md-field>
            <label for="requestType">Request Type</label>
            <md-select id="requestType" v-model="requestType">
              <md-option value="POST">POST</md-option>
              <md-option value="GET">GET</md-option>
            </md-select>
          </md-field>
          <md-button class="md-primary md-raised" @click="doRequest()">
            Do Request
          </md-button>
        </form>
        <p> Response:
          {{response}}
        </p>
      </md-card-content>
    </md-card>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
import { requestHandler } from '@/javascript/requests.js';
// Local Setup
export default {
  name: "requests",
  data: function() {
    return {
      form: {
        url: "https://partypeps.herokuapp.com",
        username: "admin",
        password: "admin",
        parameters: {
          param1: ""
        }
      },
      response: "",
      requestType: "POST",
      grantType: process.env.VUE_APP_API_GRANT_TYPE,
      apiUrl: process.env.VUE_APP_ROOT_API,
      clientId: process.env.VUE_APP_API_CLIENT_ID,
      apiKey: process.env.VUE_APP_API_KEY
    }
  },
  methods: {
    doRequest: function() {
      var authorization = requestHandler.createAuthorizationHeader(this.clientId, this.apiKey);
      var authenticationPayload = requestHandler.createAuthenticationData(this.grantType, this.clientId, this.form.username, this.form.password);
      if(this.requestType === "POST"){
        requestHandler._doOAuthPost(this.form.url, authenticationPayload, authorization,
           function(response){
              console.log(response);
           },
            function(error){
              console.log(error);
            }
        );
      }else{
        requestHandler.checkToken(this.form.url);
      }
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

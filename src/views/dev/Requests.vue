<template>
  <div id="requests">
    <md-card>
      <md-card-header>
        <span class="md-title">Test Requests</span>
      </md-card-header>
      <md-card-content>
        <form>
          <md-field>
            <label for="url">URL</label>
            <md-input name="url" id="url" v-model="form.url"/>
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
        url: "https://partypeps.herokuapp.com/oauth/token",
        parameters: {
          param1: ""
        }
      },
      response: "",
      requestType: "POST"
    }
  },
  methods: {
    doRequest: function() {
      if(this.requestType === "POST"){
        requestHandler._doPostRequest(this.form.url,
           function(response){
              console.log(response);
           },
            function(error){
              console.log(error);
            }
        );
      }else{
        requestHandler._doGetRequest(this.form.url,
          function(response){
            alert(response);
          },
          function(error){
            alert(error);
          });
      }
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

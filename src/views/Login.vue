<template>
  <div id="login">
    <md-card>
      <md-card-header>
        <h1 class="md-title">Login</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <h3 class="md-subhead">
          You need to be logged in to access this app dammit!
        </h3>
        <form>
          <md-field>
            <label for="username">Username</label>
            <md-input
              name="username"
              id="username"
              autocomplete="username"
              v-model="form.username"
              :disabled="sending"
            />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input
              name="password"
              id="password"
              type="password"
              v-model="form.password"
              :disabled="sending"
            />
          </md-field>
        </form>
      </md-card-content>
      <md-card-actions>
        <md-button
          type="submit"
          class="md-primary md-raised"
          :disabled="sending"
          >Login</md-button
        >
        <md-button class="md-accent" :disabled="sending" to="/register"
          >Register</md-button
        >
      </md-card-actions>
    </md-card>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Local Setup
export default {
  name: "login",
  data: () => {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

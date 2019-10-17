<template>
  <div id="login">
    <md-card>
      <md-card-header>
        <h1 class="md-title">Register</h1>
      </md-card-header>
      <md-divider/>
      <md-card-content>
        <h3 class="md-subhead">You need to be register in to access this app dammit!</h3>
        <form>
          <md-field>
            <label for="email">Email</label>
            <md-input name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
          </md-field>
          <md-field>
            <label for="username">Username</label>
            <md-input name="username" id="username" autocomplete="username" v-model="form.username" :disabled="sending" />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input name="password" id="password" type="password" v-model="form.password" :disabled="sending" />
          </md-field>
          <md-field>
            <label for="repeatPassword">Repeat Password</label>
            <md-input name="repeatPassword" id="repeatPassword" type="password" v-model="form.repeatPassword" :disabled="sending" />
          </md-field>
        </form>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-accent" :disabled="sending" to="/login">Login</md-button>
        <md-button type="submit" class="md-primary md-raised" :disabled="sending">Register</md-button>
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
  name: "register",
  data: () => {
    return {
      form: {
        email: "",
        username: "",
        password: "",
        repetPassword: ""
      }
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">


</style>

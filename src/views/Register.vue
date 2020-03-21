<template>
  <div id="register">
    <md-card>
      <md-card-header>
        <h1 class="md-title">Register</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <h3 class="md-subhead">
          You need to be registered in to access this app dammit!
        </h3>
        <form class="register" @submit.prevent="register">
          <md-field>
            <label for="username">Username</label>
            <md-input
              name="username"
              id="username"
              autocomplete="username"
              v-model="form.username"
              required
            />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input
              name="password"
              id="password"
              type="password"
              v-model="form.password"
              required
            />
          </md-field>
          <md-field>
            <label for="password-confirm">Confirm Password</label>
            <md-input
              name="password-confirm"
              id="password-confirm"
              type="password"
              v-model="form.passwordConfirm"
              required
            />
          </md-field>
        </form>
      </md-card-content>
      <md-card-actions>
        <md-button type="submit" class="md-primary md-raised"
          >Register</md-button
        >
        <md-button class="md-accent" to="/login">Login</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: function() {
    return {
      form: {
        username: "",
        password: "",
        passwordConfirm: ""
      }
    };
  },
  methods: {
    register: function() {
      let data = {
        username: this.username,
        password: this.password,
        is_admin: this.is_admin
      };
      this.$store.dispatch("register", data).then(() => this.$router.push("/"));
    }
  }
};
</script>

<style scoped></style>

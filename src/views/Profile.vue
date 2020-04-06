<template>
  <div class="profile">
    <md-card class="md-primary">
      <md-card-header>
        <md-card-header-text>
          <h3 class="md-title">{{ pep.name }}</h3>
          <span> profile page </span>
        </md-card-header-text>
        <md-card-media class="md-medium">
          <img
            v-if="this.checkPicture()"
            src="https://vuematerial.io/assets/examples/card-weather.png"
            alt="Un Boss"
          />
          <md-icon v-else class="md-size-5x">person</md-icon>
        </md-card-media>
      </md-card-header>
      <md-divider />
      <md-card-actions>
        <md-button @click="logout" v-if="isMyProfile()">Logout</md-button>
        <md-button @click="goToMessagePage" v-else>Message</md-button>
      </md-card-actions>
    </md-card>
    <md-card class="md-primary">
      <md-card-header>
        <md-card-header-text>
          <h3 class="md-title">About</h3>
        </md-card-header-text>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <md-card-area>
          <p>Username: {{ pep.name }}</p>
          <p>Email: {{ pep.email }}</p>
        </md-card-area>
      </md-card-content>
      <md-card-actions>
        <md-button @click="changeInfo" v-if="isMyProfile()">Edit</md-button>
      </md-card-actions>
    </md-card>
    <md-card v-if="!this.checkPicture() && this.isMyProfile()">
      <md-card-header>
        <md-card-header-text>
          <h3 class="md-title">Upload Profile Picture</h3>
        </md-card-header-text>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <md-card-area>
          <div v-if="previewImage">
            <md-card-media class="md-small">
              <img :src="previewImage" />
            </md-card-media>
          </div>
          <form class="uploadPhoto" @submit.prevent="this.uploadPhoto">
            <md-field>
              <label>Upload files</label>
              <md-file
                v-bind="user.picture"
                placeholder="Profile Picture"
                class=""
                @change="uploadPhoto"
                :disabled="true"
              />
            </md-field>
            <md-button type="submit" @click="this.uploadPhoto" :disabled="true"
              >Upload</md-button
            >
            <md-button
              :disabled="!previewImage"
              type="submit"
              @click="this.deletePhoto"
              >Delete Image</md-button
            >
          </form>
        </md-card-area>
      </md-card-content>
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
  name: "profile",
  data: function() {
    return {
      pep: this.$store.getters.getSelectedPep,
      user: this.$store.getters.getUser,
      previewImage: null,
      file: null
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch("AUTH_LOGOUT").then(() => {
        this.$router.go();
      });
    },
    checkPicture: function() {
      return this.user.picture !== undefined;
    },
    uploadPhoto: function(e) {
      const file = e.target.files[0];
      this.file = file;
      this.previewImage = URL.createObjectURL(this.file);
    },
    changeInfo: function() {
      // eslint-disable-next-line no-console
      console.log("Nope");
    },
    deletePhoto: function() {
      this.file = null;
      this.previewImage = null;
      this.user.picture = undefined;
    },
    isMyProfile: function() {
      return this.user.name === this.pep.name;
    },
    goToMessagePage: function() {
      this.$store.dispatch("SELECT_PEP", this.pep);
      this.$router.push("pepmessage");
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss"></style>

<template>
  <div id="mute">
    <md-card v-for="(user, index) in users" v-bind:key="index">
      <md-card-header>
        <md-avatar class="md-large md-avatar-icon md-primary">{{getFirstChar(user.name)}}</md-avatar>
        <md-card-header-text>
          <span class="md-title">{{ user.name }}</span>
        </md-card-header-text>
        <md-icon class="md-size-2x md-primary" v-if="! user.isMuted">volume_up</md-icon>
        <md-icon class="md-size-2x" v-else>volume_off</md-icon>
      </md-card-header>
      <md-divider/>
      <md-card-content>
        <md-switch v-model="user.isMuted">Mute
        </md-switch>
        <md-switch v-model="user.enableTranslations">Translate</md-switch>
        <div class="md-layout-item" v-if="user.enableTranslations">
          <md-field>
            <label for="language">Language</label>
            <md-select v-model="user.language">
              <md-option value="english">English</md-option>
              <md-option value="german">German</md-option>
              <md-option value="spanish">Spanish</md-option>
              <md-option value="french">French</md-option>
              <md-option value="romanian">Romanian</md-option>
              <md-option value="portuguese">Portuguese</md-option>
              <md-option value="random noise">Random Noise</md-option>
              <md-option value="mandarin">Mandarin</md-option>
              <md-option value="finnish">Finnish</md-option>
              <md-option value="danish">Danish</md-option>
              <md-option value="swedish">Swedish</md-option>
              <md-option value="norwegian">Norwegian</md-option>
              <md-option value="russian">Russian</md-option>
              <md-option value="cantonese">Cantonese</md-option>
              <md-option value="greek">Greek</md-option>
              <md-option value="italian">Italian</md-option>
              <md-option value="random squeaky noise">Random squeaky noise</md-option>
              <md-option value="birdish">Birdish</md-option>
              <md-option value="elvish">Elvish</md-option>
              <md-option value="dornish">Dornish</md-option>
            </md-select>
          </md-field>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button>
          <md-icon>share</md-icon>
          Share
        </md-button>
        <md-button>
          <md-icon>block</md-icon>
          Block
        </md-button>
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
  name: "mute",
  data: () => {
    return {
      users: [
        {
          name: "Dragos",
          language: "english",
          isMuted: false,
          enableTranslations: false
        },
        {
          name: "Vicky",
          language: "german",
          isMuted: false,
          enableTranslations: false
        },
        {
          name: "Bassel",
          language: "english",
          isMuted: false,
          enableTranslations: false
        },
        {
          name: "Elias",
          language: "german",
          isMuted: false,
          enableTranslations: false
        },
        {
          name: "Sarah",
          language: "english",
          isMuted: false,
          enableTranslations: false
        },
        {
          name: "Washing Machine",
          language: "random noise",
          isMuted: false,
          enableTranslations: false
        },
        {
          name: "Basil",
          language: "mandarin",
          isMuted: true,
          enableTranslations: false
        },
        {
          name: "Birds",
          language: "birdish",
          isMuted: false,
          enableTranslations: false
        }
      ]
    }
  },
  methods: {
    getFirstChar: function(name){
      return name.charAt(0);
    },
    like: function(index){
      var wantedUser = this.users[index];
      if(wantedUser !== undefined){
        wantedUser.isLiked = true;
        wantedUser.isDisliked = false;
      }
    },
    dislike: function(index){
      var wantedUser = this.users[index];
      if(wantedUser !== undefined){
        wantedUser.isLiked = false;
        wantedUser.isDisliked = true;
      }
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import "../assets/scss/main.scss";
</style>

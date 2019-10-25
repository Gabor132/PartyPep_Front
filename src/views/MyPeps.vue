<template>
  <div class="peps">
    <md-card class="mainCard">
      <md-card-header>
        <h1 class="md-title">My Peps</h1>
      </md-card-header>
      <md-divider />
      <md-card-content>
        <md-card v-for="pep in peps" v-bind:key="pep.id" md-with-hover>
          <md-ripple>
            <md-card-header>
              <md-card-header-text>
                <span class="md-title">{{ pep.name }}</span>
                <p class="md-subhead">{{ pep.description }}</p>
              </md-card-header-text>
              <md-card-media class="md-medium">
                <img
                  src="https://vuematerial.io/assets/examples/card-weather.png"
                  alt="Un Boss"
                />
              </md-card-media>
            </md-card-header>
            <md-card-content> </md-card-content>
            <md-card-actions>
              <md-button class="md-primary">
                Profile
              </md-button>
              <md-button class="md-primary">
                Message
              </md-button>
              <md-button class="md-primary">
                Unfollow
              </md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </md-card-content>
    </md-card>
    <md-button class="md-fab md-fab-bottom-right md-fixed" md-ripple>
      <md-icon>add</md-icon>
    </md-button>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Imports
//
// Local Setup
export default {
  name: "peps",
  data: function() {
    return {
      peps: [
        {
          id: 1,
          name: "Vasile",
          description: "Abia trezit din caruta",
          getAvatarText: function() {
            return this.name.charAt(0);
          }
        },
        {
          id: 2,
          name: "Georgica",
          description: "Caut vrabia vietii",
          getAvatarText: function() {
            return this.name.charAt(0);
          }
        },
        {
          id: 3,
          name: "Costel",
          description: "Got milk?",
          getAvatarText: function() {
            return this.name.charAt(0);
          }
        },
        {
          id: 4,
          name: "Viorica",
          description: "Iesi acasa!",
          getAvatarText: function() {
            return this.name.charAt(0);
          }
        }
      ]
    };
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
@import "../assets/scss/main.scss";
</style>

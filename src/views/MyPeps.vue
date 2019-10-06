<template>
  <div class="peps">
    <h1>My Peps</h1>
    <md-card v-for="pep in peps">
      <md-card-header>
        <md-card-header-text>
          <span class="md-title">{{pep.name}}</span>
          <p class="md-subhead">{{pep.description}}</p>
        </md-card-header-text>
        <md-card-media class="md-big">
          <img src="https://vuematerial.io/assets/examples/card-weather.png" alt="Un Boss">
        </md-card-media>
      </md-card-header>
      <md-card-content>
      </md-card-content>
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
  name: "peps",
  data: function() {
    return {
      peps: [
        {
          name: "Vasile",
          description: "Abia trezit din caruta",
          getAvatarText: function(){
            return this.name.charAt(0);
          }
        },
        {
          name: "Georgica",
          description: "Caut vrabia vietii",
          getAvatarText: function(){
            return this.name.charAt(0);
          }
        },
        {
          name: "Costel",
          description: "Got milk?",
          getAvatarText: function(){
            return this.name.charAt(0);
          }
        }
      ]
    }
  }
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">

.md-card{
  margin-bottom: 1vh;
}

.md-card-actions > .md-button{
  margin-right: 1vw;
}

</style>

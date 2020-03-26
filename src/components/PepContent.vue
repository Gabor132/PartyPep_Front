<template>
  <div id="pepcontent">
    <router-view></router-view>
    <pepserviceresponsebar></pepserviceresponsebar>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup of pagecontent
import pepserviceresponsebar from "./PepServiceResponseBar";
export default {
  name: "pepcontent",
  components: {
    pepserviceresponsebar: pepserviceresponsebar
  },
  props: ["peps"]
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
//
// Local style
#pepcontent {
  display: block;
  height: 100%;
}
</style>

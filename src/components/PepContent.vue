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
import Pepserviceresponsebar from "./PepServiceResponseBar";
export default {
  name: "pepcontent",
  components: { Pepserviceresponsebar },
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

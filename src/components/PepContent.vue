<template>
  <div id="pepcontent">
    <router-view></router-view>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup of pagecontent
export default {
  name: "pepcontent",
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

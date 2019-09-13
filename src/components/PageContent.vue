<template>
  <div class="pagecontent">
    <p>Hello!</p>
  </div>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup of pagecontent
export default {
  name: "pagecontent",
  props: ["page"]
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
//
// Local style
.pagecontent {
  display: block;
  height: 100%;
}
</style>

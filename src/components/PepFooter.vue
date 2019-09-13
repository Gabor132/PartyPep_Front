<template>
  <footer class="page-footer font-small text-black bg-black">
    <div class="footer-copyright text-center py-3">
      © 2019 Copyright:
      <a href="#">DGDynamics</a>
    </div>
  </footer>
</template>
--------------------------------------------------------------------------------
<script>
//
// Setup pepfooter
export default {
  name: "pepfooter"
};
</script>
--------------------------------------------------------------------------------
<style lang="scss">
//
// Imports
@import "@/assets/scss/_variables.scss";
//
// Local style
.pepfooter {
  background-color: $color-headers-footer;
  height: $height-footer;
  width: $width-header-footer;
  color: $color-headers-footer-content;
}
</style>

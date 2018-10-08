<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
@import "./stylesheets/main";
</style>

<style lang="scss" scoped>
.container {
  height: 80%;
  width: 80%;
  padding-top: 30px;
}
</style>

<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./global/components/Header";
export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style>
@import "./global/styles/global.scss";
</style>

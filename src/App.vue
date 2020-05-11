<template>
  <div class="app">
    <Header></Header>
    <div class="app__content">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@components/Header";
import Footer from "@components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
@import "./global/styles/global.scss";

.app {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);

  &__content {
    flex: 1;
  }
}
</style>

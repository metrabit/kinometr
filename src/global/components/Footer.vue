<template>
  <div class="footer d-flex">
    <router-link :to="{ name: 'Home' }">
      <Logo class="logo-dark" />
    </router-link>
    <nav class="footer-menu__container">
      <ul class="footer-menu">
        <li class="footer-menu__item">
          <router-link :to="{ name: 'Home' }">home</router-link>
        </li>
        <li class="footer-menu__item">
          <router-link :to="{ name: 'MoviesList' }">movies</router-link>
        </li>
        <li class="footer-menu__item">
          <router-link :to="{ name: 'ActorsList' }">actors</router-link>
        </li>
        <li class="footer-menu__item">
          <router-link :to="{ name: 'Shows' }">shows</router-link>
        </li>
      </ul>
    </nav>
    <SocialMedia />
  </div>
</template>

<script>
import Logo from "@icons/LogoDark";
import SocialMedia from "./SocialMedia";

export default {
  name: "Footer",
  components: {
    Logo,
    SocialMedia
  }
};
</script>

<style lang="scss">
@import "@global/styles/global";

.footer {
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: $yellow;
  z-index: 99;
}

.footer-menu {
  width: 320px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;

  &__container {
    flex: 1;
  }

  &__item {
    color: $black;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 15px;
    transition: 0.1s;

    &:hover {
      transform: rotate(5deg);
    }
  }

  &__input-container {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  &__input {
    width: 240px;
    padding: 5px 12px;
    border: none;
    border-radius: 3px;
    outline: none;
  }

  &__search-icon {
    position: absolute;
    bottom: 6px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
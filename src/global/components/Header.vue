<template>
  <div class="header d-flex">
    <router-link :to="{ name: 'Home' }">
      <Logo class="logo" />
    </router-link>
    <ul class="header-menu">
      <li class="header-menu__item">
        <router-link :to="{ name: 'Home' }">home</router-link>
      </li>
      <li class="header-menu__item">
        <router-link :to="{ name: 'MoviesList' }">movies</router-link>
      </li>
      <li class="header-menu__item">
        <router-link :to="{ name: 'ActorsList' }">actors</router-link>
      </li>
      <li class="header-menu__item">
        <router-link :to="{ name: 'Shows' }">shows</router-link>
      </li>
    </ul>
    <div class="header-menu__input-container">
      <input type="text" class="header-menu__input" placeholder="TO DO" />
      <SearchIcon class="header-menu__search-icon" />
    </div>
  </div>
</template>

<script>
import Logo from "@icons/Logo";
import SearchIcon from "@icons/SearchIcon";

export default {
  name: "Header",
  components: {
    Logo,
    SearchIcon
  }
};
</script>

<style lang="scss">
@import "@global/styles/global";

.header {
  position: fixed;
  top: 0;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 40px;
  background-color: $black;
  z-index: 99;
}

.header-menu {
  width: 320px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;

  &__item {
    color: $yellow;
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
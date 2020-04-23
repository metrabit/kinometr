<template>
  <ul class="menu">
    <li class="menu__item">
      <router-link :to="{ name: 'Home' }">home</router-link>
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'MoviesList' }">movies</router-link>
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'ActorsList' }">actors</router-link>
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'Shows' }">shows</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Header"
};
</script>
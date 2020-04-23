<template>
  <div class="actor-card">
    <h2 class="actor-card__title">{{actor.name}}</h2>
    <img :src="getImage(actor.profile_path)" alt class="actor-card__poster" />
  </div>
</template>  

<script>
export default {
  name: "ActorCard",
  props: {
    actor: {
      type: Object,
      required: true
    },
    genres: Array
  },
  methods: {
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    }
  }
};
</script>

<style lang="scss">
.actor-card {
  width: 20%;
  margin: 16px;
  position: relative;

  &__title {
    position: absolute;
    bottom: 0;
    padding: 8px;
    margin: 8px 0;
    font-size: 18px;
    font-weight: 300;
    color: #fff;
    background: #000000c7;
  }

  &__rating {
    position: absolute;
  }
}
</style>
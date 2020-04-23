<template>
  <div class="show-card">
    <h2 class="show-card__title">{{showInfo.name}}</h2>
    <p class="show-card__rating">rating: {{showInfo.vote_average}}</p>
    <img :src="getImage(showInfo.poster_path)" alt class="show-card__poster" />
  </div>
</template>  

<script>
export default {
  name: "ShowCard",
  props: {
    showInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    }
  }
};
</script>

<style lang="scss">
.show-card {
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
<template>
  <section class="container d-flex home-popular__container">
    <h2 class="home-popular__title">Popular movies</h2>
    <div class="home-popular">
      <div class="d-flex home-popular__list">
        <div
          v-for="movie in movieList"
          :key="movie.id"
          class="home-popular__card"
          @click="toMoviePage(movie)"
        >
          <img :src="getImage(movie.poster_path)" alt />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import key from "@global/key";
import axios from "axios";

export default {
  name: "HomePopular",
  data: () => ({
    movieList: []
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${key.code}&language=en-US&page=1`
        )
        .then(res => {
          const sortedResult = res.data.results.sort(
            (a, b) => a.popularity - b.popularity
          );

          this.movieList = sortedResult;
        });
    },
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    },
    toMoviePage(movie) {
      this.$router.push({
        name: "MoviePage",
        params: {
          id: movie.id
        }
      });
    }
  }
};
</script>  

<style lang="scss">
.home-popular {
  position: relative;
  max-width: 100%;
  overflow-y: hidden;
  height: 100%;
  min-height: 300px;
  margin-bottom: 50px;

  &__container {
    flex-direction: column;
    align-items: center;
  }

  &__list {
    padding: 16px 0;
    overflow-x: auto;
  }

  &__card {
    min-width: 170px;
    min-height: 272px;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    margin: 0 16px;
    top: 0;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      top: -16px;
    }
  }
}
</style>

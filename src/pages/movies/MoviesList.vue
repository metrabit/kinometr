<template>
  <div class="movies-list" id="app">
    <MovieCard
      v-for="(film, index) in filmsList"
      :key="index"
      :film="film"
      :genres="genres"
      @click.native="toMoviePage(film)"
    ></MovieCard>
    <button @click="toNextPage">next</button>
    {{page}}
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "./components/MovieCard";

import key from "../../global/key";

export default {
  name: "MoviesList",
  components: {
    MovieCard
  },
  data: () => ({
    filmsList: [],
    genres: [],
    page: 1
  }),
  created() {
    this.getPopularFimlsList();
    this.getGenres();
  },
  methods: {
    getPopularFimlsList() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${key.code}&language=en-US&page=${this.page}`
        )
        .then(res => {
          this.filmsList = res.data.results;
        });
    },
    getGenres() {
      axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key.code}&language=en-US`
        )
        .then(res => {
          this.genres = res.data.genres;
        });
    },
    toMoviePage(data) {
      this.$router.push({
        name: "MoviePage",
        params: {
          id: data.id
        }
      });
    },
    toNextPage() {
      this.page = this.page + 1;
      this.getPopularFimlsList();
    }
  }
};
</script>

<style lang="scss">
.movies-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 64px;
}
</style>
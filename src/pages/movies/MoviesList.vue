<template>
  <div class="movies-list" id="app">
    <div class="container movies-list__cards">
      <MovieCard
        v-for="(film, index) in filmsList.results"
        :key="index"
        :film="film"
        :genres="genres"
        @click.native="toMoviePage(film)"
      ></MovieCard>
    </div>
    <Pagination
      :currentPage="currentPage"
      :lastPage="filmsList.total_pages"
      @page-changed="getPopularFimlsList"
    />
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Pagination from "@global/components/Pagination";

import key from "@global/key";

export default {
  name: "MoviesList",
  components: {
    MovieCard,
    Pagination
  },
  data: () => ({
    filmsList: [],
    genres: [],
    currentPage: 1
  }),
  created() {
    this.getPopularFimlsList(1);
    this.getGenres();
  },
  methods: {
    getPopularFimlsList(page) {
      axios
        .get(
          // `https://api.themoviedb.org/3/movie/popular?api_key=${key.code}&language=en-US&page=${page}`
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${key.code}&language=en-US&page=${page}`
        )
        .then(res => {
          this.filmsList = res.data;
        });

      this.currentPage = page;
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
  align-items: center;
  flex-direction: column;
  padding: 64px;

  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
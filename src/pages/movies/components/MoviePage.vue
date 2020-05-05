<template>
  <!-- 
    {{movieData.adult}}
    <img
      :src="getImage(movieData.poster_path)"
      :alt="movieData.title"
    />
    {{movieData.revenue}} $
    {{movieData.budget}} $
    <div v-for="genre in movieData.genres" :key="genre.id">{{genre.name }}</div>
    {{movieData.overview}}
    <div v-for="info in movieData.production_companies" :key="info.id">
      <img :src="getImage(info.logo_path)" class="test" alt />
      <div>{{info.name}}</div>
    </div>
    <div v-for="info in movieData.production_countries" :key="info.id">{{info.name}}</div>
    {{movieData.release_date}}
    {{movieData.runtime}} min
    {{movieData.vote_average}}
    {{movieData.tagline}}
    <iframe
      width="420"
      height="315"
      :src="getVideoURL(movieData.id)"
  ></iframe>-->
  <div class="container movie-page">
    <h2 class="movie-page__title">{{ movieData.title }}</h2>
  </div>
</template>

<script>
import axios from "axios";
import key from "@global/key";

export default {
  name: "MoviePage",
  data: () => ({
    movieData: {},
    videoURL: ""
  }),
  computed: {
    currentMovieId() {
      return this.$route.params.id;
    }
  },
  created() {
    this.getData(this.currentMovieId);
  },
  mounted() {
    if (!this.movieData.length) {
      this.getData(this.currentMovieId);
      console.log(this.currentMovieId);
    }
  },
  methods: {
    getData(id) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${key.code}&language=en-US`
        )
        .then(res => (this.movieData = res.data));
    },
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    },
    getVideoURL(id) {
      axios
        .get(
          `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${key.code}&language=en-US`
        )
        .then(info => {
          const [firstResult] = info.data.results;

          this.videoURL = `https://www.youtube.com/embed/${firstResult.key}`;
        })
        .catch(
          () => (this.videoURL = "https://www.youtube.com/embed/xqQ_ZAuPH8g")
        );

      return this.videoURL;
    }
  }
};
</script>

<style lang="scss">
.movie-page {
  padding-top: 24px;
  &__title {
  }
}
</style>
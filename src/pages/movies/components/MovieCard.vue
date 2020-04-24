<template>
  <div class="movie-card">
    <h2 class="movie-card__title">{{film.title}}</h2>
    <p class="movie-card__rating">rating: {{film.vote_average}}</p>
    <img :src="getImage(film.poster_path)" alt class="movie-card__poster" />
    <h3 v-if="film.adult" class="movie-card__age">18+</h3>
  </div>
</template>  

<script>
import moment from "moment";

export default {
  name: "MovieCard",
  props: {
    film: {
      type: Object,
      required: true
    },
    genres: Array
  },
  methods: {
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    },
    formatDate(date) {
      return moment(date).format("MMM Do, YYYY");
    },
    getGenresForFilm(filmGenreIds) {
      const movieGenresList = [];

      filmGenreIds.forEach(id => {
        this.genres.map(genre => {
          if (id === genre.id) {
            movieGenresList.push(genre.name);
          }
        });
      });

      return movieGenresList;
    }
  }
};
</script>

<style lang="scss">
.movie-card {
  width: 16%;
  margin: 16px;
  position: relative;
  cursor: pointer;

  &__poster {
    width: 100%;
  }

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
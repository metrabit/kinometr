<template>
  <div>
    <h2>{{actorData.name}}</h2>
    <img :src="getImage(actorData.profile_path)" alt />
    <p>{{actorData.biography}}</p>
    <p>{{actorData.place_of_birth}}</p>
    <p v-if="actorData.birthday">{{actorData.birthday}} ({{ageActor}})</p>
    <hr />

    <div class="actor-page__popularity-movies">
      <div v-for="film in onlyTopFilms" :key="film.id" class="actor-page__movie-card">
        <h3>{{ film.title }}</h3>
        <div>{{ film.release_date }}</div>
        <div>{{ film.vote_average }}</div>
        <!-- <p>{{film.overview}}</p> -->
        <div v-for="genre in getCurrentGenres(film.genre_ids)" :key="genre">{{ genre }}</div>
        <img :src="getImage(film.poster_path)" alt />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import key from "@global/key";

export default {
  name: "ActorPage",
  data: () => ({
    actorData: {},
    actorFilms: [],
    genres: []
  }),
  computed: {
    isActorDataExist() {
      return Boolean(typeof this.actorData === "object");
    },
    isActorFilmsDataExist() {
      return Boolean(typeof this.actorFilms === "object");
    },
    ageActor() {
      return moment(this.actorData.birthday, "YYYY-MM-DD").fromNow("y");
    },
    onlyTopFilms() {
      const topFilms = this.actorFilms;
      const AMOUNT_OF_FILMS = 4;

      return topFilms.slice(0, AMOUNT_OF_FILMS);
    }
  },
  mounted() {
    this.getActorInfo();
    this.getGenres();
  },
  methods: {
    async getActorInfo() {
      const actorId = this.$route.params.id;

      await axios
        .get(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${key.code}&language=en-US`
        )
        .then(res => (this.actorData = res.data))
        .catch((this.actorData = "Data about actor is absent"));

      await axios
        .get(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${key.code}&language=en-US`
        )
        .then(res => {
          const sortedFilms = res.data.cast.sort(
            (current, next) => next.popularity - current.popularity
          );

          this.actorFilms = sortedFilms;
        })
        .catch((this.actorFilms = "Data about actor's films is absent"));
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
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    },
    getCurrentGenres(filmGenreIds) {
      const movieGenresList = [];

      if (filmGenreIds) {
        filmGenreIds.forEach(id => {
          this.genres.map(genre => {
            if (id === genre.id) {
              movieGenresList.push(genre.name);
            }
          });
        });
      }

      return movieGenresList;
    }
  }
};
</script>  

<style lang="scss">
.actor-page {
  &__popularity-movies {
    display: flex;
    justify-content: center;
  }

  &__movie-card {
    width: 20%;
  }
}
</style>
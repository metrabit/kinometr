<template>
  <section class="container home-upcoming__container">
    <h2 class="home-upcoming__title">Upcoming Movies</h2>
    <div class="d-flex home-upcoming">
      <div
        v-for="movie in topUpcomingFilms"
        :key="movie.id"
        class="d-flex home-upcoming__card"
        :style="{backgroundImage: `url('${getImage(movie.backdrop_path)}')`}"
        @click="toMoviePage(movie)"
      >
        <!-- <img :src="getImage(movie.backdrop_path)" alt class="home-upcoming__image" /> -->

        <h3 class="d-flex home-upcoming__card-title">{{ movie.title }}</h3>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import key from "@global/key";
export default {
  name: "HomeUpcoming",
  data: () => ({
    moviesList: []
  }),
  computed: {
    topUpcomingFilms() {
      const topFilms = this.moviesList;
      const AMOUNT_OF_FILMS = 3;

      return topFilms.slice(0, AMOUNT_OF_FILMS);
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${key.code}&language=en-US&page=1`
        )
        .then(res => {
          const sortedResult = res.data.results.sort(
            (a, b) => b.popularity - a.popularity
          );

          this.moviesList = sortedResult;
        });
    },
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w342/${poster_path}`;
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
.home-upcoming {
  justify-content: space-around;
  width: 95%;
  margin-bottom: 100px;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  &__card {
    justify-content: center;
    align-items: center;
    width: 342px;
    height: 192px;

    &-title {
      justify-content: center;
      align-items: center;
      margin: 0;
      width: 100%;
      height: 100%;
      font-weight: 600;
      color: #fff;
      background-color: rgba(34, 34, 34, 0.3);
      opacity: 0.9;
      cursor: pointer;
      transition: 0.5s;

      &:hover {
        opacity: 1;
        font-size: 24px;
        background-color: rgba(34, 34, 34, 0.8);
      }
    }
  }
}
</style>
  
<template>
  <div>
    <div class="d-flex">
      <div class="test2">
        <h2>
          <strong>title:</strong>
          {{movieData.title}}
        </h2>
        <div>
          <strong>is adult:</strong>
          {{movieData.adult}}
        </div>
        <img :src="getImage(movieData.poster_path)" :alt="movieData.title" />
      </div>
      <div>
        <div>
          <strong>budget:</strong>
          {{movieData.budget}} $
        </div>
        <strong>genres:</strong>
        <div v-for="genre in movieData.genres" :key="genre.id">{{genre.name }}</div>
        <p>
          <strong>description:</strong>
          {{movieData.overview}}
        </p>

        <strong>company name:</strong>
        <div v-for="info in movieData.production_companies" :key="info.id">
          <img :src="getImage(info.logo_path)" class="test" alt />
          <div>{{info.name}}</div>
        </div>
        <strong>countries:</strong>
        <div v-for="info in movieData.production_countries" :key="info.id">{{info.name}}</div>
        <div>
          <strong>release date:</strong>
          {{movieData.release_date}}
        </div>
        <div>
          <strong>runtime:</strong>
          {{movieData.runtime}} min
        </div>
        <div>
          <strong>rating:</strong>
          {{movieData.vote_average}}
        </div>
        <div>
          <strong>subtitle:</strong>
          {{movieData.tagline}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import key from "../../../global/key";

export default {
  name: "MoviePage",
  data: () => ({
    movieData: {}
  }),
  created() {
    const currentMovieId = this.$route.params.id;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${currentMovieId}?api_key=${key.code}&language=en-US`
      )
      .then(res => (this.movieData = res.data));
    console.log(this.movieData);
  },
  methods: {
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    }
  }
};
</script>

<style lang="scss">
.test {
  width: 40px;
}

.test2 {
  margin-right: 40px;
}

strong {
  text-transform: uppercase;
  margin-top: 10px;
  display: inline-block;
}
</style>
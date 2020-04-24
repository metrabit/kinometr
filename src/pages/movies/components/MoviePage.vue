<template>
  <div>
    <div class="d-flex container">
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
        <div>
          <strong>revenue:</strong>
          {{movieData.revenue}} $
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
        <iframe width="420" height="315" :src="getVideoURL(movieData.id)"></iframe>
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
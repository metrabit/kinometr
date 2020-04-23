<template>
  <div class="home-slider">
    <div v-for="(movie, i) in movies" :key="i">
      {{ movie }}
      <img :src="images[i]" alt />
      <hr />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import key from "../../global/key";

export default {
  name: "HomeSlider",
  data: () => ({
    movieIds: [77338, 158, 320],
    movies: [],
    images: [
      require("../../assets/knocking.jpg"),
      require("../../assets/leon.jpg"),
      require("../../assets/untoucheble.jpg")
    ]
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.movieIds.forEach(item => {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${item}?api_key=${key.code}&language=en-US`
          )
          .then(res => {
            this.movies.push(res.data);
          });
      });
      console.log(this.movies);
    }
  }
};
</script>
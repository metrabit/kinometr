<template>
  <section class="container d-flex home-show__container">
    <h2 class="home-show__title">Popular TV Shows</h2>
    <div class="home-show">
      <div class="d-flex home-show__list">
        <div
          v-for="show in showList"
          :key="show.id"
          class="home-show__card"
          @click="toShowPage(show)"
        >
          <img :src="getImage(show.poster_path)" alt />
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
    showList: []
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${key.code}&language=en-US&page=1`
        )
        .then(res => {
          const sortedResult = res.data.results.sort(
            (a, b) => a.popularity - b.popularity
          );

          this.showList = sortedResult;
        });
    },
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    },
    toShowPage(show) {
      this.$router.push({
        name: "ShowPage",
        params: {
          id: show.id
        }
      });
    }
  }
};
</script>  

<style lang="scss">
.home-show {
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

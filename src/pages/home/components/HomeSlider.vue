/* eslint-disable vue/valid-v-for */
<template>
  <div class="home-slider">
    <ArrowSide isLeftWay @click.native="changeSlide(prevSlide)" />
    <!--  eslint-disable vue/no-use-v-if-with-v-for -->
    <div
      v-if="currentSlide === index"
      v-for="(movie, index) in movies"
      :key="movie.id"
      class="home-slider__item"
    >
      <div>
        <div class="home-slider__poster-container">
          <img :src="movie.imageForSlider[0].path" alt class="home-slider__poster" />
          <div class="home-slider__dots">
            <div
              v-for="(dot, i) in movies"
              :key="i+1000"
              class="home-slider__dot"
              :class="{ 'home-slider__dot--active': i === index }"
              @click="changeSlide(i)"
            >
              <div class="d-none">{{dot}}</div>
            </div>
          </div>
        </div>
        <div class="home-slider__item-content">
          <h2 class="home-slider__title">{{ movie.original_title }}</h2>
          <p class="home-slider__description">{{movie.overview}}</p>
          <div class="home-slider__btn" @click="toMoviePage(movie)">check it</div>
        </div>
      </div>
      <hr />
    </div>
    <ArrowSide @click.native="changeSlide(nextSlide)" />
  </div>
</template>

<script>
import axios from "axios";
import key from "@global/key";
import ArrowSide from "@global/icons/ArrowSide";

export default {
  name: "HomeSlider",
  components: {
    ArrowSide
  },
  data: () => ({
    movieIds: [158, 101, 77338],
    movies: [],
    images: [
      {
        path: require("@assets/knocking.jpg"),
        id: 158
      },
      {
        path: require("@assets/leon.jpg"),
        id: 101
      },
      {
        path: require("@assets/untoucheble.jpg"),
        id: 77338
      }
    ],
    currentSlide: 0
  }),
  computed: {
    nextSlide() {
      return this.currentSlide === this.images.length - 1
        ? 0
        : this.currentSlide + 1;
    },
    prevSlide() {
      return this.currentSlide === 0
        ? this.images.length - 1
        : this.currentSlide - 1;
    }
  },
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
            const imageForSlider = this.images.filter(
              item => item.id === res.data.id
            );

            this.movies.push({
              ...res.data,
              imageForSlider
            });
          });
      });
    },
    changeSlide(slide) {
      this.currentSlide = slide;
      return slide;
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
@import "@global/styles/global";

.home-slider {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  margin-bottom: 40px;
  min-height: 480px;
  min-width: 100%;

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 1012px;
    min-height: 480px;
    width: fit-content;
    margin: 0 16px;
  }

  &__item-content {
    width: 320px;
    position: absolute;
    top: 30px;
    right: 30px;
    background-color: rgba(34, 34, 34, 0.8);
    padding: 16px;
    color: #fff;
  }

  &__title {
    margin-top: 0;
  }

  &__btn {
    width: fit-content;
    padding: 6px 24px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    color: $black;
    background-color: $yellow;
  }

  &__dots {
    position: absolute;
    bottom: 40px;
    right: 30px;
    display: flex;
  }

  &__dot {
    width: 10px;
    height: 10px;
    background-color: unset;
    margin-left: 14px;
    border-radius: 100%;
    border: 1.5px solid $yellow;
    cursor: pointer;

    &--active {
      background-color: $yellow;
    }
  }
}
</style>
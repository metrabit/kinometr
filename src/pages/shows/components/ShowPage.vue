<template>
  <div>
    <div>{{showInfo.name}}</div>
    <img :src="getImage(showInfo.poster_path)" alt />
    <strong>Created by:</strong>
    <div v-for="author in showInfo.created_by" :key="author.id">{{author.name}}</div>
    <div>
      <strong>episode runtime</strong>
      {{showInfo.episode_run_time}}
    </div>
    <strong>first air date</strong>
    <div>{{showInfo.first_air_date}}</div>
    <strong>genres</strong>
    <div v-for="genre in showInfo.genres" :key="genre.id">{{ genre.name }}</div>
    <strong>last air date</strong>
    <div>{{showInfo.last_air_date}}</div>
    <strong>rating</strong>
    <div>{{showInfo.vote_average}}</div>
    <strong>next episode -</strong>
    <div>{{showInfo.next_episode_to_air}}</div>
    <strong>number of episodes</strong>
    <div>{{showInfo.number_of_episodes}} episodes {{showInfo.number_of_seasons}} seasons</div>
    <p>
      <strong>description</strong>
      {{showInfo.overview}}
    </p>
    <div v-for="season in showInfo.seasons" :key="season.id">
      <h2>{{season.season_number}}. {{season.name}} ({{season.episode_count}} episodes)</h2>
      <p>{{season.overview}}</p>
      <div>{{season.air_date}}</div>
      <img :src="getImage(season.poster_path)" alt />
    </div>
    <hr />
  </div>
</template>

<script>
import key from "@global/key";
import axios from "axios";

export default {
  name: "ShowPage",
  data: () => ({
    showInfo: {}
  }),
  created() {
    this.getShowData();
  },
  methods: {
    getShowData() {
      const showId = this.$route.params.id;

      axios
        .get(
          `https://api.themoviedb.org/3/tv/${showId}?api_key=${key.code}&language=en-US`
        )
        .then(res => (this.showInfo = res.data))
        .catch(() => (this.showInfo = "Data is absent"));
    },
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    }
  }
};
</script>
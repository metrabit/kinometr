<template>
  <div>
    <h2>{{actorData.name}}</h2>
    <img :src="getImage(actorData.profile_path)" alt />
    <p>{{actorData.biography}}</p>
    <p>{{actorData.place_of_birth}}</p>
    <p v-if="actorData.birthday">{{actorData.birthday}} ({{ageActor}})</p>
    <hr />
    <pre>

    {{actorFilms}}
    </pre>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import key from "../../../global/key";

export default {
  name: "ActorPage",
  data: () => ({
    actorData: {},
    actorFilms: {}
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
    }
  },
  mounted() {
    this.getActorInfo();
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
            (current, next) => next.vote_average - current.vote_average
          );

          this.actorFilms = sortedFilms;
        })
        .catch((this.actorFilms = "Data about actor's films is absent"));
    },
    getImage(poster_path) {
      return `http://image.tmdb.org/t/p/w185/${poster_path}`;
    },
    getTopFilms(filmCount) {
      console.log(filmCount);
    }
  }
};
</script>  
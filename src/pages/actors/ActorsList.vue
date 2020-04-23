<template>
  <div class="actors-list">
    <ActorCard
      v-for="(actor, index) in actorsList"
      :key="index"
      :actor="actor"
      @click.native="toActorPage(actor)"
    ></ActorCard>
  </div>
</template>

<script>
import axios from "axios";
import ActorCard from "./components/ActorCard";

import key from "../../global/key";

export default {
  name: "ActorsList",
  components: {
    ActorCard
  },
  data: () => ({
    actorsList: []
  }),
  created() {
    this.getPopularActorsList();
  },
  methods: {
    getPopularActorsList() {
      axios
        .get(
          `https://api.themoviedb.org/3/person/popular?api_key=${key.code}&language=en-US&page=1`
        )
        .then(res => {
          this.actorsList = res.data.results;
        });
    },
    toActorPage(data) {
      this.$router.push({
        name: "ActorPage",
        params: {
          id: data.id
        }
      });
    }
  }
};
</script>

<style lang="scss">
.actors-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 64px;
}
</style>
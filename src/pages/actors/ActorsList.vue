<template>
  <div class="actors-list">
    <div class="actors-list__cards">
      <ActorCard
        v-for="(actor, index) in actorsList.results"
        :key="index"
        :actor="actor"
        @click.native="toActorPage(actor)"
      ></ActorCard>
    </div>
    <Pagination
      :currentPage="currentPage"
      :lastPage="actorsList.total_pages"
      @page-changed="getPopularActorsList"
    />
  </div>
</template>

<script>
import axios from "axios";
import ActorCard from "./components/ActorCard";
import Pagination from "@global/components/Pagination";

import key from "@global/key";

export default {
  name: "ActorsList",
  components: {
    ActorCard,
    Pagination
  },
  data: () => ({
    actorsList: [],
    currentPage: 1
  }),
  created() {
    this.getPopularActorsList(this.currentPage);
  },
  methods: {
    getPopularActorsList(page) {
      console.log(page);
      axios
        .get(
          `https://api.themoviedb.org/3/person/popular?api_key=${key.code}&language=en-US&page=${page}`
        )
        .then(res => {
          this.actorsList = res.data;
        });

      this.currentPage = page;
      console.log(this.actorsList);
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
  align-items: center;
  flex-direction: column;
  padding: 64px;

  &__cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
<template>
  <div class="shows">
    <div class="shows__list">
      <ShowCard
        v-for="(show, index) in showList.results"
        :key="index"
        :show-info="show"
        @click.native="toShowPage(show)"
      ></ShowCard>
    </div>
    <Pagination
      :currentPage="currentPage"
      :lastPage="showList.total_pages"
      @page-changed="getPopularShowList"
    />
  </div>
</template>

<script>
import axios from "axios";
import ShowCard from "./components/ShowCard";
import Pagination from "@global/components/Pagination";

import key from "@global/key";

export default {
  name: "Shows",
  components: {
    ShowCard,
    Pagination
  },
  data: () => ({
    showList: [],
    currentPage: 1
  }),
  created() {
    this.getPopularShowList(this.currentPage);
  },
  methods: {
    getPopularShowList(page) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${key.code}&language=en-US&page=${page}`
        )
        .then(res => {
          this.showList = res.data;
        });

      this.currentPage = page;
    },
    toShowPage(data) {
      this.$router.push({
        name: "ShowPage",
        params: {
          id: data.id
        }
      });
    }
  }
};
</script>

<style lang="scss">
.shows {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 64px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
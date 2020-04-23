<template>
  <div class="shows">
    <ShowCard
      v-for="(show, index) in showList.results"
      :key="index"
      :show-info="show"
      @click.native="toShowPage(show)"
    ></ShowCard>
    <Pagination
      :currentPage="showList.page"
      :lastPage="showList.totalPages"
      :newData="showList"
      :url="getDataFromAnotherPage('next')"
    />
  </div>
</template>

<script>
import axios from "axios";
import ShowCard from "./components/ShowCard";
import Pagination from "../../global/components/Pagination";

import key from "../../global/key";

export default {
  name: "Shows",
  components: {
    ShowCard,
    Pagination
  },
  data: () => ({
    showList: [],
    page: 1
  }),
  created() {
    this.getPopularShowList();
  },
  methods: {
    getPopularShowList() {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${key.code}&language=en-US&page=1`
        )
        .then(res => {
          this.showList = res.data;
        });
    },
    toShowPage(data) {
      this.$router.push({
        name: "ShowPage",
        params: {
          id: data.id
        }
      });
    },
    getDataFromAnotherPage(way) {
      if (way === "next") {
        this.page += 1;
      } else if (way === "prev" && this.page !== 1) {
        this.page -= 1;
      }

      return `https://api.themoviedb.org/3/tv/popular?api_key=${key.code}&language=en-US&page=${this.page}`;
    }
  }
};
</script>

<style lang="scss">
.shows {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 64px;
}
</style>
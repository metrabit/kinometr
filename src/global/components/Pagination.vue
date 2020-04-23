<template>
  <div>
    <strong>1</strong>
    <ArrowSide isLeftWay @click.native="changePage('prev', url, newData)"></ArrowSide>
    <strong>{{ currentPage }}</strong>
    <ArrowSide @click.native="changePage('next', url, newData)"></ArrowSide>
    <strong>{{ lastPage }}</strong>
  </div>
</template>

<script>
import ArrowSide from "../icons/ArrowSide";

import axios from "axios";
export default {
  name: "Pagination",
  components: {
    ArrowSide
  },
  props: {
    currentPage: Number,
    lastPage: Number,
    url: {
      type: String,
      required: true
    },
    newData: {
      type: Object,
      required: true
    }
  },
  methods: {
    changePage(way, url, newData) {
      if (way === "prev") {
        this.getData(url, newData);
      } else {
        this.getData(url, newData);
      }
      console.log(url);
    },
    // eslint-disable-next-line no-unused-vars
    getData(url, newData) {
      axios
        .get(url)
        .then(res => (newData = res))
        .catch(() => (newData = "data is not exist"));
    }
  }
};
</script>
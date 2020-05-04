<template>
  <div class="pagination d-flex">
    <div @click="changePage(1)" class="pagination__btn">1</div>
    <ArrowSide isLeftWay @click.native="changePage(prevPage)"></ArrowSide>
    {{ currentPage }}
    <ArrowSide @click.native="changePage(nextPage)"></ArrowSide>
    <div @click="changePage(lastPage)" class="pagination__btn">{{ lastPage }}</div>
  </div>
</template>

<script>
import ArrowSide from "@icons/ArrowSide";

// import axios from "axios";
export default {
  name: "Pagination",
  components: {
    ArrowSide
  },
  computed: {
    nextPage() {
      return this.currentPage === this.lastPage
        ? this.currentPage
        : this.currentPage + 1;
    },
    prevPage() {
      return this.currentPage !== 1 ? this.currentPage - 1 : this.currentPage;
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    lastPage: Number
  },
  methods: {
    changePage(page) {
      this.$emit("page-changed", page);
    }
  }
};
</script>

<style lang="scss">
.pagination {
  align-items: center;
  width: 20%;
  justify-content: space-between;

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #333;
    border-radius: 3px;
    padding: 6px 0;
    width: 48px;
    cursor: pointer;
  }
}
</style>
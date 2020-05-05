<template>
  <div>
    <HomeSlider></HomeSlider>
    <HomePopular></HomePopular>
    <HomeUpcoming></HomeUpcoming>
    <HomeShowPopular></HomeShowPopular>
  </div>
</template>

<script>
import HomeSlider from "./components/HomeSlider";
import HomePopular from "./components/HomePopular";
import HomeUpcoming from "./components/HomeUpcoming";
import HomeShowPopular from "./components/HomeShowPopular";

export default {
  name: "Home",
  components: {
    HomeSlider,
    HomePopular,
    HomeUpcoming,
    HomeShowPopular
  }
};
</script>
<template>
  <div class="carousel carousel-center max-w-md mx-2 my-6 p-4 space-x-6 bg-neutral rounded-box">
    <ReactionsCarouselItem
      v-for="(reaction, index) in reactions"
      :key="index"
      :reaction="reaction"
    />
  </div>
</template>
<script>
import ReactionsCarouselItem from "./ReactionsCarouselItem.vue";

export default {
  components: { ReactionsCarouselItem },
  props: {
    reactions: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

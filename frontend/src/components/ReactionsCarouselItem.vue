<template>
  <div class="carousel-item">
    <div class="avatar">
      <div class="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img v-if="reaction?.avatar" :src="reaction?.avatar?.url" alt="avatar" />
        <img v-else src="../assets/default-avatar.svg" alt="avatar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReactionsCarouselItem",
  props: {
    reaction: {
      type: Object,
      required: true,
      default: () => ({
        avatar: null,
      }),
    },
  },
};
</script>

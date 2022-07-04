<template>
  <section class="grid px-2 py-4">
    <div class="card card-side bg-base-100">
      <div class="avatar m-2">
        <div class="w-14 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
          <img v-if="match.avatar" :src="match.avatar.url" alt="avatar" />
          <img v-else src="../assets/default-avatar.svg" alt="avatar" />
        </div>
      </div>
      <div class="card-body p-0 m-2">
        <div class="font-extrabold">{{ match.name }}</div>
        <div class="badge badge-md">
          <div class="font-extrabold">{{ match.breed }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    match: {
      type: Object,
      required: true,
      default: () => ({
        avatar: null,
      }),
    },
  },
};
</script>

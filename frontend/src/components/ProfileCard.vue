<template>
  <div class="card card-compact w-auto max-w-[26rem] mt-8 bg-base-100 shadow-xl mx-3">
    <figure>
      <img
        v-if="profile?.avatar"
        :src="profile?.avatar?.url"
        class="w-full h-full min-h-[20rem] max-h-[20rem] object-cover"
        alt="profile-picture"
      />
      <img
        v-else
        src="../assets/default-avatar.svg"
        class="w-full h-full min-h-[20rem] max-h-[20rem] object-cover"
        alt="profile-picture"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        {{ capitalize(profile.name) }}
        <span class="ml-2 text-primary">{{ profile.age }}</span>
      </h2>

      <section class="space-x-2 space-y-2">
        <div class="badge badge-md gap-2">
          Breed <span class="font-extrabold">{{ profile.breed }}</span>
        </div>

        <div class="badge badge-md gap-2">
          Gender
          <span class="font-extrabold">{{ capitalize(profile.gender) }}</span>
        </div>

        <div class="badge badge-md gap-2">
          <span class="font-extrabold">{{ location[0] }}</span>
          {{ location[1] }}
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { capitalizeFirstLetter } from "../helpers/capitalize-first-letter";
import { splitByComma } from "../helpers/split-by-comma";

export default {
  props: {
    profile: {
      type: Object,
      required: true,
      default: () => ({
        avatar: null,
      }),
    },
  },
  computed: {
    location() {
      return splitByComma(this.profile.location);
    },
  },
  methods: {
    capitalize(value) {
      return capitalizeFirstLetter(value);
    },
  },
};
</script>

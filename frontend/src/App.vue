<template>
  <section class="p-2">
    <Navbar />
    <section class="grid justify-center grid-flow-row w-auto p-2">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

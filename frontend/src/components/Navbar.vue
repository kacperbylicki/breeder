<template>
  <section class="grid place-items-end">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <Logo />
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <ThemeSwitch />
        <Avatar v-if="isAuthenticated" :profile="profile" />
        <button v-else class="btn gap-2 h-8 px-4 m-2 text-sm" @click="redirectToLogin">
          Login
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from "./Avatar.vue";
import Logo from "./Logo.vue";
import ThemeSwitch from "./ThemeSwitch.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Logo,
    ThemeSwitch,
    Avatar,
  },
  computed: {
    ...mapGetters(["isAuthenticated", "profile"]),
  },
  methods: {
    redirectToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

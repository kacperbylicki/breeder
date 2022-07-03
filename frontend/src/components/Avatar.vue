<template>
  <div v-if="profile !== null" class="dropdown dropdown-end">
    <label tabIndex="0" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img v-if="profile.avatar" :src="profile.avatar" alt="avatar" />
        <img v-else src="../assets/default-avatar.svg" alt="avatar" />
      </div>
    </label>
    <ul
      tabIndex="{0}"
      class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a @click="redirectProfile">Profile</a>
      </li>
      <li>
        <a class="justify-between" @click="redirectToMatches">
          Matches
          <span class="badge">{{ matchesAmount }}</span>
        </a>
      </li>
      <li>
        <a @click="handleLogout">Logout</a>
      </li>
    </ul>
  </div>

  <label v-else tabIndex="0" class="btn btn-ghost btn-circle avatar">
    <div class="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <img src="../assets/default-avatar.svg" alt="avatar" />
    </div>
  </label>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    profile: {
      type: Object,
      default: () => ({
        avatar: null,
      }),
    },
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
    };
  },
  computed: {
    ...mapGetters(["matchesAmount"]),
  },
  methods: {
    ...mapActions(["logout"]),
    redirectProfile() {
      this.$router.push("/profile");
    },
    redirectToMatches() {
      this.$router.push("/matches");
    },
    async handleLogout() {
      this.isLoading = true;

      try {
        await this.logout();

        this.isLoading = false;

        await this.$router.push("/login");
      } catch (error) {
        this.errorMessage = error?.message;

        this.isLoading = false;
      }
    },
  },
};
</script>

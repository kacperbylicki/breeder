<template>
  <Loading v-if="isLoading" />
  <ErrorAlert v-if="errorMessage" :error-message="errorMessage" />
  <div v-else class="grid place-items-center">
    <div class="card w-96 max-w-sm mt-8 bg-base-100">
      <div class="text-left">
        <div class="text-lg font-extrabold px-4">
          Reactions
          <div class="badge badge-primary mx-2">{{ reactionsAmount }}</div>
        </div>
      </div>

      <ReactionsCarousel :reactions="reactions" />

      <div class="text-left">
        <div class="text-lg font-extrabold px-4">
          Matches
          <div class="badge badge-secondary mx-2">{{ matchesAmount }}</div>
        </div>
      </div>

      <MatchRow v-for="(match, index) in matches" :key="index" :match="match" />
    </div>
  </div>
</template>
<script>
import ErrorAlert from "../components/ErrorAlert.vue";
import Loading from "../components/Loading.vue";
import MatchRow from "../components/MatchRow.vue";
import ReactionsCarousel from "../components/ReactionsCarousel.vue";
import { getMatches, getReactions } from "../services";
import { mapMutations } from "vuex";

export default {
  components: {
    Loading,
    ReactionsCarousel,
    MatchRow,
    ErrorAlert,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      matches: [],
      reactions: [],
    };
  },
  computed: {
    matchesAmount() {
      return this.matches.length;
    },
    reactionsAmount() {
      return this.reactions.length;
    },
  },
  async mounted() {
    this.isLoading = true;

    await this.fetchReactions();
    await this.fetchMatches();

    this.isLoading = false;
  },
  methods: {
    ...mapMutations(["setMatchesAmount"]),
    async fetchReactions() {
      try {
        const { reactions, error } = await getReactions();

        if (!error) {
          this.reactions = reactions ?? [];
        }

        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      }
    },
    async fetchMatches() {
      try {
        const { matches, error } = await getMatches();

        if (!error) {
          this.matches = matches ?? [];
          this.setMatchesAmount(matches.length);
        }

        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      }
    },
    resetErrorMessage() {
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    },
  },
};
</script>

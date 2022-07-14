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

      <MatchRow v-for="(match, index) in paginatedMatches" :key="index" :match="match" />

      <div class="btn-group w-full justify-center mt-6">
        <button class="btn" @click="previousPage">«</button>
        <button class="btn">Page {{ pageIndex + 1 }}</button>
        <button class="btn" @click="nextPage">»</button>
      </div>
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
      paginatedMatches: [],
      pageIndex: 0,
      matchesLimit: 4,
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

        this.errorMessage = error?.message;

        this.resetErrorMessage();
      } catch (error) {
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
          this.paginatedMatches = this.matches.slice(this.pageIndex, this.matchesLimit);
        }

        this.errorMessage = error?.message;

        this.resetErrorMessage();
      } catch (error) {
        this.errorMessage = error?.message;

        this.resetErrorMessage();
      }
    },
    nextPage() {
      if (this.pageIndex + 1 < this.matches.length / this.matchesLimit) {
        this.pageIndex++;
        this.paginatedMatches = this.matches.slice(
          this.pageIndex * this.matchesLimit,
          this.matchesLimit * (this.pageIndex + 1),
        );
      }
    },
    previousPage() {
      if (this.pageIndex > 0) {
        this.pageIndex--;
        this.paginatedMatches = this.matches.slice(
          this.pageIndex * this.matchesLimit,
          this.matchesLimit * (this.pageIndex + 1),
        );
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

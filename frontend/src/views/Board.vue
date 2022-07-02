<template>
  <Loading v-if="isLoading" />
  <section v-if="board?.length > 0 && currentIndex < board?.length" class="grid place-items-center">
    <div class="stack">
      <ProfileCard :profile="board[currentIndex]" />
    </div>
    <div class="btn-group mt-6 space-x-4">
      <div class="tooltip tooltip-bottom" data-tip="Like">
        <button
          class="btn btn-circle btn-lg fill-green-500"
          @click="react(board[currentIndex].uuid, 'positive')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 448 512">
            <path
              d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"
            />
          </svg>
        </button>
      </div>
      <div class="tooltip tooltip-bottom" data-tip="Favorite">
        <button class="btn btn-circle btn-lg fill-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6">
            <path
              d="M489.1 363.3l-24.03 41.59c-6.635 11.48-21.33 15.41-32.82 8.78l-129.1-74.56V488c0 13.25-10.75 24-24.02 24H231.1c-13.27 0-24.02-10.75-24.02-24v-148.9L78.87 413.7c-11.49 6.629-26.19 2.698-32.82-8.78l-24.03-41.59c-6.635-11.48-2.718-26.14 8.774-32.77L159.9 256L30.8 181.5C19.3 174.8 15.39 160.2 22.02 148.7l24.03-41.59c6.635-11.48 21.33-15.41 32.82-8.781l129.1 74.56L207.1 24c0-13.25 10.75-24 24.02-24h48.04c13.27 0 24.02 10.75 24.02 24l.0005 148.9l129.1-74.56c11.49-6.629 26.19-2.698 32.82 8.78l24.02 41.59c6.637 11.48 2.718 26.14-8.774 32.77L352.1 256l129.1 74.53C492.7 337.2 496.6 351.8 489.1 363.3z"
            />
          </svg>
        </button>
      </div>
      <div
        class="tooltip tooltip-bottom"
        data-tip="Reject"
        @click="react(board[currentIndex].uuid, 'negative')"
      >
        <button class="btn btn-circle btn-lg fill-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-8 w-8">
            <path
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>

  <section v-else class="grid place-items-center">
    <div class="card w-auto bg-base-100 text-center mt-20">
      <div class="card-body">
        <p class="font-extrabold text-xl">
          No new propositions, <span class="text-primary">try again later</span>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import Loading from "../components/Loading.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { createReaction, getBoard } from "../services";
import { mapGetters } from "vuex";

export default {
  components: {
    Loading,
    ProfileCard,
  },
  data() {
    return {
      isLoading: false,
      errorMessage: null,
      currentIndex: 0,
      board: [],
    };
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  async mounted() {
    this.isLoading = true;

    await this.fetchBoard();

    this.isLoading = false;
  },
  methods: {
    async fetchBoard() {
      try {
        const { profiles, error } = await getBoard();

        if (!error) {
          this.board = profiles?.filter((p) => p.uuid !== this.profile?.uuid) ?? [];
        }

        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      }
    },
    async react(targetAccountId, type) {
      try {
        const { reaction, error } = await createReaction({ type, targetAccountId });

        if (reaction && !error) {
          this.currentIndex = this.currentIndex + 1;
        }

        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error?.response?.data?.message;
      }
    },
  },
};
</script>

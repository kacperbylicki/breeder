export const matches = {
  state: {
    matchesAmount: 0,
  },
  mutations: {
    setMatchesAmount: (state, matchesAmount) => {
      state.matchesAmount = matchesAmount;
    },
  },
  getters: {
    matchesAmount: (state) => state.matchesAmount,
  },
};

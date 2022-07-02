import { getCurrentUser, loginAccount, logoutAccount, refreshTokens } from "../services";

export const authentication = {
  state: {
    accessToken: null,
    refreshToken: null,
    profile: null,
    isAuthenticated: false,
  },
  actions: {
    login: async ({ commit }, payload) => {
      const { accessToken, refreshToken, profile, error } = await loginAccount(payload);

      if (!error) {
        commit("setTokens", { accessToken, refreshToken });
        commit("setProfile", profile);
      }
    },
    logout: async ({ state, commit }) => {
      const { error } = await logoutAccount(state);

      if (!error) {
        commit("clearAccountData");
      }
    },
    getCurrentUser: async ({ state, commit }) => {
      const { account, error } = await getCurrentUser(state.accessToken);

      if (!error) {
        commit("setProfile", account);
      }
    },
    refreshToken: async ({ state, commit }) => {
      const { accessToken, refreshToken, error } = await refreshTokens(state.refreshToken);

      if (!error) {
        commit("setTokens", { accessToken, refreshToken });
      }
    },
  },
  mutations: {
    setTokens: (state, { accessToken, refreshToken }) => {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!accessToken && !!refreshToken;
    },
    setProfile: (state, profile) => {
      state.profile = profile;
      state.isAuthenticated = true;
    },
    clearAccountData: (state) => {
      state.refreshToken = null;
      state.accessToken = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    accessToken: (state) => state.accessToken,
    refreshToken: (state) => state.refreshToken,
    profile: (state) => state.profile,
  },
};

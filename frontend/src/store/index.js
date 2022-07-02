import Cookies from "js-cookie";
import createPersistedState from "vuex-persistedstate";
import { authentication } from "./authentication";
import { createStore } from "vuex";
import { matches } from "./matches";

export const store = createStore({
  modules: {
    authentication,
    matches,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, state) => Cookies.set(key, state, { expires: 7, secure: true }),
        removeItem: (key) => Cookies.remove(key),
      },
    }),
  ],
});

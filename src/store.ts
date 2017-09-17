import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface Store {
  name: string;
}

import req from "xhr";

const store = new Vuex.Store<Store>({
  actions: {
    async updateAsync(context, newName: string) {
      const name = await req(newName);
      context.commit("update", name);
    },
  },
  mutations: {
    update(state, newName: string) {
      state.name = newName;
    },
  },
  state: () => ({
    name: "Wallaby",
  }),
});

export default store;

/* globals process Promise */
/* eslint require-jsdoc:0 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    count: 0
  },
  getters: {
    evenOrOdd: state => {
      return state.count % 2 === 0 ? "even" : "odd";
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    increment: ({ commit }) => commit("increment"),
    decrement: ({ commit }) => commit("decrement"),
    incrementIfOdd({ commit, state }) {
      if ((state.count + 1) % 2 === 0) {
        commit("increment");
      }
    },
    incrementAsync({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("increment");
          resolve();
        }, 1000);
      });
    }
  }
});

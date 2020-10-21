export const state = () => ({
  user: {},
  counter: 1,
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  INCREMENT_COUNTER(state) {
    state.counter++;
  }
}

export const state = () => ({
  user: {},
  counter: 0,
  hasSeenFinishScreen: false
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  INCREMENT_COUNTER(state) {
    state.counter++;
  },
  SET_HAS_SEEN_FINISH_SCREEN(state, value) {
    state.hasSeenFinishScreen = value;
  }
}

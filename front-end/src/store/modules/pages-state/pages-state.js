import * as types from '@/store/mutation-types';

const state = {
  season: {},
};

const getters = {
  season: () => state.season,
  selectedSeasonId: () => state.season.selectedSeasonId || 0,
  selectedHeroClass: () => state.season.selectedHeroClass || '',
};

/* eslint-disable */
const mutations = {
  [types.SET_PAGE_SELECTED_SEASON_ID](state, { seasonId }) {
    state.season.selectedSeasonId = seasonId;
  },
  [types.SET_PAGE_SELECTED_HERO_CLASS](state, { heroClass }) {
    state.season.selectedHeroClass = heroClass;
  },
};
/* eslint-enable */

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};

import * as types from '@/store/mutation-types';
import blizzD3 from '@/utils/blizz-d3';

const state = {
  season: {},
};

const getters = {
  season: () => state.season,
  selectedSeasonId: () => state.season.selectedSeasonId || 0,
  selectedHeroClass: () => state.season.selectedHeroClass || '',
};

const actions = {
  /* eslint-disable */
  getSeasonHeroClassData({ commit }, { seasonId, heroClass }) {
    /*  TODO
    blizzD3.GetSeasonData({ seasonId, heroClass })
      .done(function(data) {
        if (typeof data === 'object') {
          const players = [];

          //  Duplicate Code (api.js) Consider regrouping
          data.row = data.row.splice(0, MAX_ROW);
          data.row.forEach((player) => {
            playerTmp = {};
            player.data.forEach((playerData) => playerTmp[playerData.id] = playerData[Object.keys(playerData)[1]]);
            player.player[0].data.forEach((playerDetails) => playerTmp[playerDetails.id] = playerDetails[Object.keys(playerDetails)[1]]);
            players.push(playerTmp);
          });

          const seasonHeroClass = { title: data.title[state.app.locale] || data.title['en_US'], row: players };
          commit(types.SET_SEASON_HERO_CLASS, { seasonId, heroClass, seasonHeroClass });
          commit(types.SET_SHARED_HEROES_CLASS_DATA, { type: 'column', data: data.column });
          commit(types.SET_SHARED_HEROES_CLASS_DATA, { type: `${seasonId}seasonLastUpdateTime`, data: data.last_update_time });  //  CHANGED Take only one date per season
        } else { console.warn('Error did not receive expected data type: ', data); }
      })
      .fail((e) => console.log('Error with GetSeasonData: ', e));
      */
    /* eslint-enable */
  },
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
  actions,
  mutations,
};

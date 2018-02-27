import * as types from '@/store/mutation-types';
/* eslint-disable */
import blizzD3 from '@/utils/blizz-d3';

const state = {
  season: {
    selectedSeasonId: '',
    selectedHeroClass: '',
    sharedHeroesClassData: {
      headers: [],
    },
    selectedHeroesClassData: {
      row: [],
    },
  },
};

const getters = {
  season: () => state.season,
  selectedSeasonId: () => state.season.selectedSeasonId,
  selectedHeroClass: () => state.season.selectedHeroClass,
  sharedHeroesClassData: () => state.season.sharedHeroesClassData,
  heroesClassTableHeaders: () => state.season.sharedHeroesClassData.headers,
  heroesClassTableRow: () => state.season.selectedHeroesClassData.row,
  selectedHeroesClassData: () => state.season.selectedHeroesClassData,
};

const actions = {
  //  Duplicate Code (simillar function in api.js) Consider regrouping
  getSeasonHeroClassData({ commit, rootState }) {
    const seasonId = getters.selectedSeasonId();
    const heroClass = getters.selectedHeroClass();

    blizzD3.GetSeasonData({ seasonId, heroClass })
      .done(function(data) {
        if (typeof data === 'object') {
          const players = [];
          let playerTmp = {};

          data.row.forEach((player) => {
            playerTmp = {};
            player.data.forEach((playerData) => playerTmp[playerData.id] = playerData[Object.keys(playerData)[1]]);
            player.player[0].data.forEach((playerDetails) => playerTmp[playerDetails.id] = playerDetails[Object.keys(playerDetails)[1]]);
            players.push(playerTmp);
          });

          //  NOTE As of now order wont matter since it is set in the layout but it may be use full later on.
          const headers = [];
          const visibleColumn = ['Rank', 'BattleTag', 'RiftLevel', 'RiftTime', 'CompletedTime', 'HeroGender', 'ClanName'];
          const orderColumn = { Rank: 0, BattleTag: 1, RiftLevel: 2, RiftTime: 3, CompletedTime: 4, HeroGender: 5, ClanName: 6 };
          data.column.forEach((column) => {
            if (visibleColumn.indexOf(column.id) !== -1) {
              headers.push({ order: orderColumn[column.id], value: column.id, align: 'left', text: column.label[rootState.api.app.locale] || column.label['en_US'] });
            }
          });

          const seasonHeroClassData = { title: data.title[rootState.api.app.locale] || data.title['en_US'], row: players };
          commit(types.SET_PAGES_SELECTED_HERO_CLASS_DATA, { seasonHeroClassData });
          commit(types.SET_PAGES_SHARED_HEROES_CLASS_DATA, { type: 'headers', data: headers });
          commit(types.SET_PAGES_SHARED_HEROES_CLASS_DATA, { type: `${seasonId}seasonLastUpdateTime`, data: data.last_update_time });  //  CHANGED Take only one date per season
        } else { console.warn('Error did not receive expected data type: ', data); }
      })
      .fail((e) => console.log('Error with GetSeasonData: ', e));
    /* eslint-enable */
  },
};

/* eslint-disable */
const mutations = {
  [types.SET_PAGES_SELECTED_SEASON_ID](state, { seasonId }) {
    state.season.selectedSeasonId = seasonId;
    if (!state.season.selectedHeroClass) {
      state.season.selectedHeroClass = 'barbarian';
    }
  },
  [types.SET_PAGES_SELECTED_HERO_CLASS](state, { heroClass }) {
    state.season.selectedHeroClass = heroClass;
  },
  [types.SET_PAGES_SELECTED_HERO_CLASS_DATA](state, { seasonHeroClassData }) {
    state.season.selectedHeroesClassData = seasonHeroClassData;
  },
  [types.SET_PAGES_SHARED_HEROES_CLASS_DATA](state, { type, data }) {
    if (!state.season.sharedHeroesClassData) {
      state.season.sharedHeroesClassData = {};
    }
    state.season.sharedHeroesClassData[type] = data;
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

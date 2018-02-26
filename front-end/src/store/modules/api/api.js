import * as types from '../../mutation-types';
import blizzD3 from '../../../utils/blizz-d3';
import appConst from '../const/const';
// import mock from './mock';

const DEBUG = process.env.NODE_ENV !== 'production';
const TOTAL_SEASONS = (DEBUG) ? 2 : 12;  //  If you go higher turn of vuex logger
const MAX_ROW = (DEBUG) ? 25 : 125;
const MAX_TOP_PLAYERS = (DEBUG) ? 22 : 102;  //  102 => give 100 Top player
const TOP_PLAYERS_TMP = {};
// const MOCK = (DEBUG) ? mock : '';

const state = {
  app: {
    DEBUG,
    TOTAL_SEASONS,
    locale: 'en_US',
    origin: 'us',
    isRdy: false,
    assets: appConst.assets,
  },
  credential: {},
  seasonsTopPlayers: {},
  seasonsHeroesClass: {},
  sharedHeroesClassData: {},
  seasonsLeaderboardsLists: {},
};

const getters = {
  appDEBUG: () => state.app.DEBUG,
  appIsRdy: () => state.app.isRdy,
  appAssets: () => state.app.assets,
  appTOTAL_SEASONS: () => state.app.TOTAL_SEASONS,
  seasonsTopPlayers: () => state.seasonsTopPlayers,
  seasonsHeroesClass: () => state.seasonsHeroesClass,
  sharedHeroesClassData: () => state.sharedHeroesClassData,
  seasonsLeaderboardsLists: () => state.seasonsLeaderboardsLists,
};

const actions = {
  getAccessToken({ commit }) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      blizzD3.fetchToken(data => {
        if (typeof data === 'object') {
          commit(types.SET_ACCESS_TOKEN, { data });
          resolve('Authentication completed');
        } else {
          reject('Something went wrong with your Authentication try again!');
        }
      });
    });
  },
  getSeasonsLeaderboardsList({ commit }, { season }) {
    /* eslint-disable */
    blizzD3.GetSeasonsLeaderboardsList(season)
      .done(function(data) {
        if (typeof data === 'object') {
          commit(types.SET_SEASONS_LEADERBOARDS_LIST, { data });
        } else { console.warn('Error did not receive expected data type: ', data); }
      })
      .fail((e) => console.warn('Error with GetSeasonsLeaderboardsList: ', e));
    /* eslint-enable */
  },
  getSeasonHeroClassData({ commit }, { seasonId, heroClass }) {
    /* eslint-disable */
    blizzD3.GetSeasonData({ seasonId, heroClass })
      .done(function(data) {
        if (typeof data === 'object') {
          const players = [];
          let playerTmp = {};

          //  Most of this function should be refactor and import from another file
          if (!TOP_PLAYERS_TMP[seasonId]) { TOP_PLAYERS_TMP[seasonId] = []; }

          data.row = data.row.splice(0, MAX_ROW);
          data.row.forEach((player) => {
            playerTmp = {};
            player.data.forEach((playerData) => playerTmp[playerData.id] = playerData[Object.keys(playerData)[1]]);
            player.player[0].data.forEach((playerDetails) => playerTmp[playerDetails.id] = playerDetails[Object.keys(playerDetails)[1]]);
            players.push(playerTmp);
            if (playerTmp.Rank < MAX_TOP_PLAYERS) {
              TOP_PLAYERS_TMP[seasonId].push({ heroClass, playerRank: playerTmp.Rank, RiftLevel: playerTmp.RiftLevel });
            }
          });

          const seasonHeroClass = { title: data.title[state.app.locale] || data.title['en_US'], row: players };
          commit(types.SET_SEASON_HERO_CLASS, { seasonId, heroClass, seasonHeroClass });

          TOP_PLAYERS_TMP[seasonId].sort(function(a, b) {
            return b.RiftLevel - a.RiftLevel || a.playerRank - b.playerRank;
          });
          TOP_PLAYERS_TMP[seasonId] = TOP_PLAYERS_TMP[seasonId].splice(0, MAX_TOP_PLAYERS - 2);
          commit(types.SET_TOP_PLAYERS, { seasonId, topPlayers: TOP_PLAYERS_TMP[seasonId] });

          commit(types.SET_SHARED_HEROES_CLASS_DATA, { type: 'column', data: data.column });
          commit(types.SET_SHARED_HEROES_CLASS_DATA, { type: `${seasonId}seasonLastUpdateTime`, data: data.last_update_time });  //  CHANGED Take only one date per season
        } else { console.warn('Error did not receive expected data type: ', data); }
      })
      .fail((e) => console.log('Error with GetSeasonData: ', e));
    /* eslint-enable */
  },
};

/* eslint-disable */
const mutations = {
  [types.SET_ACCESS_TOKEN](state, { data }) {
    state.credential = data;
  },
  [types.SET_SEASONS_LEADERBOARDS_LIST](state, { data }) {
    const finalRes = [];

    //filtering : Only 'not hardcore' and only teamsize = 1 for this example
    for (let i = 0; i < data.leaderboard.length; i++) {
      if ((!data.leaderboard[i].team_size) || (data.leaderboard[i].team_size != 1)) {
        continue;
      }
      if (data.leaderboard[i].ladder.href.indexOf('-hardcore-') >= 0) {
        continue;
      }
      finalRes.push(data.leaderboard[i]);
    }
    data.leaderboard = finalRes;
    state.seasonsLeaderboardsLists[data.season_id] = data;
  },
  [types.SET_SEASON_HERO_CLASS](state, { seasonId, heroClass, seasonHeroClass }) {
    if (!state.seasonsHeroesClass[seasonId]) {
      state.seasonsHeroesClass[seasonId] = {};
    }
    state.seasonsHeroesClass[seasonId][heroClass] = seasonHeroClass;
  },
  [types.SET_SHARED_HEROES_CLASS_DATA](state, { type, data }) {
    if (!state.sharedHeroesClassData[type]) {
      state.sharedHeroesClassData[type] = data;
    }
  },
  [types.SET_TOP_PLAYERS](state, { seasonId, topPlayers }) {
    if (!state.seasonsTopPlayers[seasonId]) {
      state.seasonsTopPlayers[seasonId] = [];
    }
    state.seasonsTopPlayers[seasonId] = topPlayers;
  },
  [types.SET_APP_STATE_RDY](state, { isRdy }) {
    state.app.isRdy = isRdy;
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

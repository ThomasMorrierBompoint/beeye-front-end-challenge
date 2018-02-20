import blizzD3 from '../../../utils/blizz-d3';

const state = {
  test: 'test',
};

const actions = {
  getSeasonsLeaderboarsList({ commit }, { season }) {
    // commit(types.EDIT_SORT_OPTION, { kindKey, sort });
    blizzD3.GetSeasonsLeaderboarsList(season);

    /* eslint-disable */
    setTimeout(() => {
      blizzD3.GetSeasonData({ season, hero_class_string: 'crusader' });
      setTimeout(() => console.log(blizzD3), 2500);
    }, 2000);
  },
};

export default {
  namespaced: true,
  actions,
  state,
};

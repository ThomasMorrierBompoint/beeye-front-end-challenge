import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from '@/plugins/logger';
import api from '@/store/modules/api/api';
import pages from '@/store/modules/pages-state/pages-state';

const DEBUG = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    pages,
  },
  strict: DEBUG,
  plugins: DEBUG ? [createLogger()] : [],
});

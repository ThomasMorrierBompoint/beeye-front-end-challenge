import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from '@/plugins/logger';
import api from '@/store/modules/api/api';

const DEBUG = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
  },
  strict: DEBUG,
  plugins: DEBUG ? [createLogger()] : [],
});

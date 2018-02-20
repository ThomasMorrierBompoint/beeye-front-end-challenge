import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from '../plugins/logger';
import api from './modules/api/api';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

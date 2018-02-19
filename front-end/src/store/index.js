import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from '../plugins/logger';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

import Vue from 'vue';
import Icon from './index.vue';
Vue.component('svg-icon', Icon);
// import all svg
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

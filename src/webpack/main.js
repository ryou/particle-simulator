import Vue from 'vue';
import Vuetify from 'vuetify';

import AppComponent from './app/template.vue';

Vue.use(Vuetify);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render(h) {
    return h(AppComponent);
  },
});

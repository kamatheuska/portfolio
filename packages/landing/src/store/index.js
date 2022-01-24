import { createStore } from 'vuex';

import app from './modules/app';
import navigation from './modules/navigation';

export default createStore({
  modules: {
    app,
    navigation,
  },
});

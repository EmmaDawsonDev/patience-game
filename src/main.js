import Vue from "vue";
import App from "./App.vue";
import VueDragDrop from "vue-drag-drop";
import i18n from './i18n'

Vue.config.productionTip = false;

Vue.use(VueDragDrop);

new Vue({
  i18n,
  render: (h) => h(App)
}).$mount("#app");

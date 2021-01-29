import Vue from "vue";
import App from "./App.vue";
import VueDragDrop from "vue-drag-drop";

Vue.config.productionTip = false;

Vue.use(VueDragDrop);

new Vue({
  render: (h) => h(App),
}).$mount("#app");

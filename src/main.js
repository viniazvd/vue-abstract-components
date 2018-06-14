import Vue from 'vue'
import Root from './Root.vue'

import plugins from './support/plugins'

Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  render: h => h(Root)
}).$mount('#app')

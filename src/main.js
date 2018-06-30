import Vue from 'vue'
import Root from './Root.vue'

import plugins from './support/plugins'
import Popover from './components/APopover'

Vue.use(Popover)
Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  render: h => h(Root)
}).$mount('#app')

// vue instance
import Vue from 'vue'

// entry component app
import Root from './Root.vue'

// plugins
import plugins from './support/plugins'

// directives
import popover from './support/directives/popover'

Vue.directive('popover', popover)
Vue.use(plugins)

Vue.config.productionTip = false

new Vue({ render: h => h(Root) }).$mount('#app')

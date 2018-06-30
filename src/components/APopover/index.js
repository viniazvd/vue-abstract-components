import props from './props'
import computed from './computed'
import methods from './methods'

import { events } from '../../support/bus'

import './style.scss'

const popover = {
  name: 'a-popover',

  props,

  data () {
    return {
      visible: false,
      positionClass: '',
      position: {
        left: 0,
        top: 0
      }
    }
  },

  mounted () {
    events.$on(this.showEventName, this.showEventListener)
    events.$on(this.hideEventName, this.hideEventListener)
  },

  beforeDestroy () {
    events.$off(this.showEventName, this.showEventListener)
    events.$off(this.hideEventName, this.hideEventListener)
  },

  computed,

  methods,

  render (h) {
    if (!this.visible) return

    return h('div', this.optionsPopover, this.$slots.default)
  }
}

export default popover

// export default {
//   install (Vue, params = {}) {
//     document.addEventListener('resize', (event) => {
//       events.$emit('hide', { srcEvent: event })
//     })

//     Vue.component('Popover', popover)

//     Vue.directive('popover', directive)
//   }
// }

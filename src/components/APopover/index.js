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
      position: { left: 0, top: 0 },
      align: 'center'
    }
  },

  mounted () {
    document.addEventListener('keydown', this.clickEscape, true)

    events.$on('show:click', this.showEventListener)
    events.$on('hide:click', this.hideEventListener)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.clickEscape, true)

    events.$off('show:click', this.showEventListener)
    events.$off('hide:click', this.hideEventListener)
  },

  computed,

  methods,

  render (h) {
    if (!this.visible) return

    return h('div', this.optionsPopover, this.$slots.default)
  }
}

export default popover

import props from './props'
import './style.scss'

import AIcon from '../AIcon'

const index = {
  props,

  computed: {
    optionsIcon () {
      return {
        attrs: { class: 'icon' },
        props: { icon: this.icon, iconSize: this.iconSize }
      }
    }
  },

  methods: {
    makeIcon (h) {
      return this.icon ? [ h(AIcon, this.optionsIcon) ] : false
    }
  },

  render (h) {
    const text = [ h('span', { attrs: { class: 'text' } }, [this.$slots.default]) ]

    return h(`h${this.size}`,
      {
        style: { color: this.color },
        attrs: { class: 'a-title' }
      },
      [ this.makeIcon(h), ...text ])
  }
}

export default index

import props from './props'
import computed from './computed'
import './style.scss'

import AIcon from '../AIcon'

const index = {
  props,

  computed,

  methods: {
    makeIcon (h) {
      return this.icon
        ? [ h(AIcon,
          {
            attrs: { class: 'icon' },
            props: { icon: this.icon, size: this.fixedIconSize }
          })
        ] : false
    }
  },

  render (h) {
    const text = [ h('span', { attrs: { class: 'text' } }, [this.$slots.default]) ]

    return h('button', this.optionsButton, [ ...text, this.makeIcon(h) ])
  }
}

export default index

import props from './props'
import './style.scss'

import AIcon from '../AIcon'

const index = {
  props,

  computed: {
    hasText () {
      return !!this.$slots.default
    },

    buttonClass () {
      return [
        'c-button',
        '-' + this.size,
        {
          '-primary': this.primary,
          '-alternative': this.alternative,
          '-warning': this.warning,
          '-icon': !!this.icon,
          '-icon-only': !this.hasText && this.icon,
          '-block': this.block,
          '-ghost': this.ghost
        }
      ]
    },

    fixedIconSize () {
      const sizes = { sm: '11', md: '15', lg: '19', xl: '17' }

      return this.iconSize || sizes[this.size]
    }
  },

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

    return h('button', { class: this.buttonClass }, [ ...text, this.makeIcon(h) ])
  }
}

export default index

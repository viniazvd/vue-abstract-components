import './style.scss'

const index = {
  name: 'a-modal',

  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },

  mounted () {
    document.addEventListener('click', this.clickOutside, true)
  },

  beforeDestroy () {
    document.removeEventListener('click', this.clickOutside, true)
  },

  methods: {
    clickOutside (e) {
      const el = this.$refs.overlay
      const close = this.$refs.close

      if ((!!el && el.contains(e.target)) ||
         (!!close && close.contains(e.target))) this.$emit('close')
    }
  },

  render (h) {
    if (!this.isOpen) return false

    const overlay = h('div', { staticClass: 'overlay', ref: 'overlay' })

    const slot = h('div', { staticClass: 'slot-content' }, this.$slots.default)
    const close = h('div', { staticClass: 'close-button', ref: 'close' }, 'X')
    const modal = h('div', { staticClass: 'modal' }, [ close, slot ])

    return h('div', { ref: 'container', staticClass: 'a-modal' }, [ overlay, modal ])
  }
}

export default index

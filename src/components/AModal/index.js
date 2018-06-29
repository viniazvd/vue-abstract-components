import './style.scss'
import ACard from '../ACard'

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
      const el = this.$refs.container

      if (!!el && !el.contains(e.target) && !this.isOpen) this.$emit('close')
    }
  },

  render (h) {
    if (!this.isOpen) return false

    const slot = [ h(ACard, { attrs: { class: 'slot-container' } }, this.$slots.default) ]

    return h('div', { ref: 'container', staticClass: 'a-modal' }, slot)
  }
}

export default index

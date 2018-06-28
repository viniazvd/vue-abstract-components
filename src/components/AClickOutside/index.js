export default {
  name: 'a-click-outside',

  props: {
    handler: {
      type: Function,
      required: true
    }
  },

  mounted () {
    document.addEventListener('click', this.handleClickOutside, true)
  },

  beforeDestroy () {
    document.removeEventListener('click', this.handleClickOutside, true)
  },

  methods: {
    handleClickOutside (e) {
      const el = this.$refs.container

      if (!el.contains(e.target)) this.handler(e)
    }
  },

  render (h) {
    return h('div', { ref: 'container' }, this.$slots.default)
  }
}

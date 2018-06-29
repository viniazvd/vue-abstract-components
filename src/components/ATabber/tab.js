const index = {
  name: 'a-tab',

  props: ['title', 'titleSlot', 'disabled'],

  render (h) {
    return h('div', { staticClass: 'vue-tabpanel', attrs: { role: 'tabpanel' } }, this.$slots.default)
  }
}

export default index

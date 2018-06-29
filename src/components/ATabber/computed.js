const computed = {
  optionsUl () {
    return {
      staticClass: 'vue-tablist',
      attrs: { role: 'tablist' }
    }
  },

  optionsRoot () {
    return {
      staticClass: 'vue-tabs',
      attrs: { role: 'tabs' }
    }
  }
}

export default computed

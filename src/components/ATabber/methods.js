const methods = {
  switchTab (e, index, isDisabled) {
    if (!isDisabled) {
      this.selectedIndex = index
      this.onSelect && this.onSelect(e, index)
    }
  },

  makeTab (h, content, index, isDisabled) {
    return h('li',
      {
        staticClass: 'vue-tab',
        attrs: {
          role: 'tab',
          'aria-selected': this.selectedIndex === index ? 'true' : 'false',
          'aria-disabled': isDisabled ? 'true' : 'false'
        },
        on: {
          click: (e) => this.switchTab(e, index, isDisabled)
        }
      }, content)
  }
}

export default methods

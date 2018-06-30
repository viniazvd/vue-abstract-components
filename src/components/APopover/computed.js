const computed = {
  style () {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
      ...this.position
    }
  },

  optionsPopover () {
    return {
      staticClass: 'a-popover',
      style: this.style,
      attrs: { 'popover': this.name },
      on: {
        click (event) {
          event.stopPropagation()
        }
      },
      ref: 'dropdown'
    }
  }
}

export default computed

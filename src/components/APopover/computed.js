const computed = {
  showEventName () {
    return `show:${this.event}`
  },

  hideEventName () {
    return `hide:${this.event}`
  },

  className () {
    return [ 'a-popover', this.pointer && this.positionClass ]
  },

  style () {
    return { width: `${this.width}px`, ...this.position }
  },

  optionsPopover () {
    return {
      class: this.className,
      style: this.style,
      attrs: { 'data-popover': this.name },
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

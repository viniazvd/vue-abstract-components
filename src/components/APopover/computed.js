const computed = {
  alignPosition () {
    let translated = {}

    if (this.align === 'center') {
      translated = `translateX(-50%)`
    } else if (this.align === 'left') {
      translated = `translateX(calc(-100% + 15px))`
    } else {
      translated = `translateX(calc(-15px))`
    }

    return { transform: translated }
  },

  style () {
    return {
      // padding: `${this.padding}px`,
      ...this.alignPosition,
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
      ref: 'popover'
    }
  }
}

export default computed

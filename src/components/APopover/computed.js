const computed = {
  alignPosition () {
    const arrowSize = 4

    if (this.align === 'left') {
      const percentage = -100 + this.padding + arrowSize

      return { transform: `translateX(calc(${percentage}%))` }
    } else if ((this.align === 'right')) {
      const pixels = -(this.padding + arrowSize)

      return { transform: `translateX(calc(${pixels}px))` }
    }
  },

  arrowPosition () {
    if (this.align === 'center') {
      return { '--left': '49%' }
    } else if (this.align === 'left') {
      return { '--right': `${this.padding}px` }
    } else {
      return { '--left': `${this.padding}px` }
    }
  },

  style () {
    return { ...this.alignPosition, ...this.arrowPosition, ...this.position }
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

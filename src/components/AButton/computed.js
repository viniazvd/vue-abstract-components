const computed = {
  hasText () {
    return !!this.$slots.default
  },

  buttonClass () {
    return [
      'c-button',
      '-' + this.size,
      {
        '-primary': this.primary,
        '-alternative': this.alternative,
        '-warning': this.warning,
        '-icon': !!this.icon,
        '-icon-only': !this.hasText && this.icon,
        '-block': this.block,
        '-ghost': this.ghost,
        '-disabled': this.disabled
      }
    ]
  },

  fixedIconSize () {
    const sizes = { sm: '11', md: '15', lg: '19', xl: '17' }

    return this.iconSize || sizes[this.size]
  },

  optionsButton () {
    return {
      class: this.buttonClass,
      attrs: this.$props,
      on: this.$listeners
    }
  }
}

export default computed

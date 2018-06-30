const px = v => v + 'px'

const computed = {
  className () {
    const { value, disabled } = this

    return [ 'a-toggle', { '-toggled': value, '-disabled': disabled } ]
  },

  coreStyle () {
    return {
      width: px(this.width),
      height: px(this.height),
      borderRadius: px(Math.round(this.height / 2))
    }
  },

  buttonRadius () {
    return this.height - this.margin * 2
  },

  distance () {
    return px(this.width - this.height + this.margin)
  },

  buttonStyle () {
    return {
      width: px(this.buttonRadius),
      height: px(this.buttonRadius),
      transform: this.value ? `translate3d(${this.distance}, 3px, 0px)` : null
    }
  },

  labelStyle () {
    return { lineHeight: px(this.height) }
  },

  makeLabel (h) {
    return this.label ? [ h('span', { attrs: { class: 'label' } }, this.label) ] : false
  },

  optionsCheckbox () {
    return {
      domProps: {
        checked: this.value
      },
      attrs: {
        class: 'input',
        type: 'checkbox'
      },
      on: {
        click: (e) => {
          e.stopPropagation()

          return this.toggle()
        }
      }
    }
  }
}

export default computed

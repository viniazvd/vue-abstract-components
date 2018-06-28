const computed = {
  hasRequiredError () {
    return this.isTouched && !this.isRequired && !this.isFilled
  },

  hasRegexError () {
    return (this.isTouched && this.isRequired && this.regexValidation && this.error) && this.value
  },

  error () {
    if (this.regexValidation && this.value && this.isTouched) {
      const isValidRegex = this.$f.regexValidation(this.regexValidation, this.value)

      return !isValidRegex
    }
  },

  maxlength () {
    if (this.mask) {
      const maskLength = this.mask.split('').length
      const divisorLength = this.mask.split().filter(v => v === '#')

      return maskLength - divisorLength
    }
  },

  // shorthand computeds by 'template'
  optionsTextArea () {
    return {
      domProps: {
        value: this.value
      },
      attrs: {
        class: 'textarea',
        cols: this.cols,
        rows: this.rows
      }
    }
  },

  optionsInput () {
    const configInputPosition = { position: 'relative', left: '25px' }
    const style = this.icon ? configInputPosition : false

    return {
      domProps: {
        value: this.value
      },
      style: { ...this.styleInput, ...style },
      attrs: {
        class: 'input',
        type: this.type,
        maxlength: this.maxlength,
        disabled: this.disabled,
        placeholder: this.placeholder
      },
      on: {
        input: event => {
          this.$emit('input', event.target.value)
        }
      },
      directives: [{
        name: 'mask',
        rawName: 'v-mask',
        value: this.mask,
        expression: 'mask'
      }]
    }
  },

  optionsIcon () {
    const configIconPosition = { position: 'absolute', left: 0, top: '25px' }
    const style = this.icon ? configIconPosition : false

    return {
      style: { ...style },
      props: { icon: this.icon }
    }
  }
}

export default computed

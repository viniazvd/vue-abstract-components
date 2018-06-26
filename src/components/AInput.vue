<script>
import { mask } from 'vue-the-mask'

export default {
  name: 'a-input',

  props: {
    styleContainer: {
      type: Object,
      default: () => ({ 'width': '100%' })
    },
    styleLabel: {
      type: Object,
      default: () => ({ 'paddingRight': '10px' })
    },
    styleInput: {
      type: Object,
      default: () => ({ 'height': '25px' })
    },
    styleError: {
      type: Object,
      default: () => ({ 'color': 'red' })
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: value => 'text|number|email|password|search|url|tel|file|color'.split('|').indexOf(value) > -1
    },
    isTouched: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    regexValidation: {
      type: String,
      default: () => ''
    },
    mask: [String, Array],
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    textArea: {
      type: Boolean,
      default: false
    },
    cols: {
      type: String,
      default: '30'
    },
    rows: {
      type: String,
      default: '10'
    },
    isFilled: Boolean,
    errorMessage: {
      type: String,
      default: `Campo vazio ou inválido`
    }
  },

  watch: {
    value (a, b) {
      if (a !== b && !this.isTouched) {
        this.$emit('update:isTouched', true)
      }
    },

    error (isValidRegex) {
      this.$emit('error', { [this.name]: isValidRegex })
    }
  },

  directives: {
    mask (el, binding) {
      if (!binding.value || !binding.value.length) {
        return
      }
      return mask(el, binding)
    }
  },

  computed: {
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
      return {
        domProps: {
          value: this.value
        },
        style: this.styleInput,
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
    }
  },

  render (createElement) {
    const label = [ createElement('div', { attrs: { 'class': 'label' } }, this.label) ]
    const textArea = [ createElement('textarea', this.optionsTextArea) ]
    const input = [ createElement('input', this.optionsInput) ]

    const makeRequiredError = () => {
      return this.hasRequiredError
        ? [ createElement('span', { style: this.styleError, attrs: { class: 'error' } }, this.errorMessage) ]
        : false
    }

    const makeRegexError = () => {
      return this.hasRegexError
        ? [ createElement('span', { style: this.styleError, attrs: { class: 'error' } }, `${this.regexValidation} não é válido`) ]
        : false
    }

    return createElement('div', { attrs: { 'class': 'a-input-component' } },
      [
        ...label,
        this.textArea ? textArea : input,
        makeRequiredError(),
        makeRegexError()
      ])
  }
}
</script>

<style lang="scss">
.a-input-component {
  max-width: 400px;

  .container {
    display: flex;
    justify-content: baseline;
    flex-direction: column;

    .label { text-transform: uppercase; }
    .input {}
    .error { padding-top: 5px; }
    .textarea {}
  }
}
</style>

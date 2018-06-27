import { mask } from 'vue-the-mask'
import aIcon from '../AIcon'
import './style.scss'

const index = {
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
    icon: String,
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
      validator: type => /text|number|email|password|search|url|tel|file|color/.test(type)
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

  methods: {
    makeRequiredError (h) {
      return this.hasRequiredError
        ? [ h('span', { style: this.styleError, attrs: { class: 'error' } }, this.errorMessage) ]
        : false
    },

    makeRegexError (h) {
      return this.hasRegexError
        ? [ h('span', { style: this.styleError, attrs: { class: 'error' } }, `${this.regexValidation} não é válido`) ]
        : false
    },

    makeIcon (h) {
      return this.icon ? [ h(aIcon) ] : false
    }
  },

  render (h) {
    const label = [ h('div', { attrs: { 'class': 'label' } }, this.label) ]
    const textArea = [ h('textarea', this.optionsTextArea) ]
    const input = [ h('input', this.optionsInput) ]

    return h('div', { attrs: { 'class': 'a-input-component' } },
      [
        ...label,
        this.textArea ? textArea : input,
        this.makeIcon(h),
        this.makeRequiredError(h),
        this.makeRegexError(h)
      ])
  }
}

export default index

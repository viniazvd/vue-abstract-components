import props from './props'
import computed from './computed'
import './style.scss'

import AIcon from '../AIcon'

import { mask } from 'vue-the-mask'

const index = {
  name: 'a-input',

  props,

  computed,

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
      return this.icon ? [ h(AIcon, this.optionsIcon) ] : false
    }
  },

  render (h) {
    const label = [ h('div', { attrs: { 'class': 'label' } }, this.label) ]

    // adjust later: create components and import reactively
    const textArea = [ h('textarea', this.optionsTextArea) ]
    const input = [ h('input', this.optionsInput) ]

    return h('div', { attrs: { 'class': 'a-input' } },
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

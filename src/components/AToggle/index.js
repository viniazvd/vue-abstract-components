import props from './props'
import computed from './computed'
import './style.scss'

const index = {
  name: 'a-toggle',

  props,

  computed,

  methods: {
    toggle () {
      if (this.disabled) return

      this.hasConfirmation
        ? this.$emit('toggled', !this.value)
        : this.$emit('update:value', !this.value)
    }
  },

  render (h) {
    const checkbox = [ h('input', this.optionsCheckbox) ]

    const button = [ h('button', { style: this.buttonStyle, attrs: { class: 'button' } }) ]

    const checked = [ h('span', { style: this.labelStyle, attrs: { class: 'label -checked' } }, this.checked) ]
    const unchecked = [ h('span', { style: this.labelStyle, attrs: { class: 'label -unchecked' } }, this.unchecked) ]

    const options = [ h('div',
      { style: this.coreStyle, attrs: { class: 'toggle-container' } },
      [ button, this.value ? checked : unchecked ]) ]

    return h('label', { class: this.className },
      [
        this.makeLabel,
        checkbox,
        options
      ])
  }
}

export default index

const props = {
  value: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hasConfirmation: {
    type: Boolean,
    default: false
  },
  checked: {
    type: String,
    default: 'Ativo'
  },
  unchecked: {
    type: String,
    default: 'Ativo'
  },
  label: {
    type: String,
    default: ''
  },
  height: {
    type: [Number, String],
    default: 40
  },
  width: {
    type: [Number, String],
    default: 130
  },
  margin: {
    type: [Number, String],
    default: 3
  }
}

export default props

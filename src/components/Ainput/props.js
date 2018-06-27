const props = {
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
  color: String,
  size: String,
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
}

export default props

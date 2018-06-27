const props = {
  size: {
    type: [Number, String],
    default: 'md',
    validator: (size) => ['sm', 'md', 'lg', 'xl'].includes(size)
  },
  icon: String,
  iconSize: String,
  primary: Boolean,
  alternative: Boolean,
  warning: Boolean,
  block: Boolean,
  ghost: Boolean,
  disabled: Boolean
}

export default props

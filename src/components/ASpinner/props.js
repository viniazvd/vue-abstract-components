const props = {
  options: {
    type: Object,
    default: () => ({ sm: 20, md: 40, lg: 80 })
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].find(it => it === v)
  }
}

export default props

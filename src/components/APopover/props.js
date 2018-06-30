const props = {
  name: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    default: 180
  },
  pointer: {
    type: Boolean,
    default: true
  },
  event: {
    type: String,
    default: 'click'
  },
  anchor: {
    type: Number,
    default: 0.5,
    validator: (v) => v >= 0 && v <= 1
  }
}

export default props

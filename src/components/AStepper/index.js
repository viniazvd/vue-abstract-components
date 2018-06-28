import './style.scss'

export default {
  name: 'a-stepper',

  functional: true,

  props: {
    total: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    },
    currentColor: {
      type: String,
      default: 'rgb(68, 0, 204)'
    },
    defaultColor: {
      type: String,
      default: 'rgb(130, 140, 153)'
    },
    handleClick: {
      type: Function
    }
  },

  render (h, { props, data }) {
    const steps = []

    for (let i = 0; i < props.total; i++) {
      const color = i === props.current ? props.currentColor : props.defaultColor
      steps.push(h('div', {
        class: 'step',
        style: {color, borderColor: color},
        on: {
          click: () => props.handleClick && props.handleClick(i)
        }
      }, [i + 1]))
    }

    const attrs = Object.assign({}, data, { class: ['a-stepper', data.class] })

    return h('div', attrs, [
      h('span', {class: 'step-line'}),
      ...steps
    ])
  }
}

import './style.scss'

import Icon from 'vue-svgicon'

const index = {
  name: 'a-icon',

  functional: true,

  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '20'
    },
    color: {
      type: String,
      default: 'black'
    }
  },

  render (h, context) {
    (async function loadIcon () {
      await import('../../assets/icons/' + context.props.icon)
    }())

    const aIcon = [ h(Icon, {
      staticClass: 'c-icon',
      style: { fill: context.props.color },
      attrs: {
        icon: context.props.icon,
        width: context.props.size,
        height: context.props.size
      }
    }) ]

    return h('div', { attrs: { 'class': 'c-icon' } }, [ aIcon ])
  }
}

export default index

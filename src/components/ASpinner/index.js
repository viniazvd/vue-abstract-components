import props from './props'
import './style.scss'

import { transform, optionsCircle, optionsSvg } from './computeds'

const index = {
  functional: true,

  props,

  render (h, { props }) {
    const circle = h('circle', optionsCircle(props))
    const g = h('g', { attrs: { transform: transform(props) } }, [ circle ])

    const svg = h('svg', optionsSvg(props), [ g ])

    const slot = h('slot', { slot: 'message' })

    return h('span', null, [ svg, slot ])
  }
}

export default index

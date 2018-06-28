import props from './props'
import makeIcon from './makeIcon'
import './style.scss'

import AIcon from '../AIcon'

const index = {
  functional: true,

  props,

  render (h, { props, children }) {
    const text = [ h('span', { attrs: { class: 'text' } }, [ children ]) ]

    return h(`h${props.size}`,
      {
        style: { color: props.color },
        attrs: { class: 'a-title' }
      },
      [ makeIcon(h, { props })(AIcon), text ])
  }
}

export default index

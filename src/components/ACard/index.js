import './style.scss'

const index = {
  functional: true,

  render (h, { children }) {
    return h('div', { class: 'a-card' }, children)
  }
}

export default index

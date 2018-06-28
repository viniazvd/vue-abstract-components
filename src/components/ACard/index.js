import './style.scss'

const index = {
  render (h) {
    return h('div', { class: 'a-card' }, [this.$slots.default])
  }
}

export default index

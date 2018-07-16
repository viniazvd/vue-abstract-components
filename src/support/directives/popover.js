import { events } from '../bus'

const defaultPosition = 'bottom'
const defaultAlign = 'center'

const prepareBinding = ({ arg = '', modifiers = {}, value = {} }) => {
  const mods = Object.keys(modifiers)
  const name = typeof value === 'object' && value.name ? value.name : console.warn('name not defined')
  const position = mods[0] || value.position || defaultPosition
  const align = value.align || defaultAlign

  return { name, position, align, value }
}

const addClickEventListener = (target, params) => {
  const click = (srcEvent) => {
    events.$emit('show:click', { ...params, target, srcEvent })

    let handler = (srcEvent) => {
      events.$emit('hide:click', { ...params, target, srcEvent })
      document.removeEventListener('click', handler)
    }

    document.addEventListener('click', handler)
    srcEvent.stopPropagation()
  }

  target.addEventListener('click', click)

  target.$popoverRemoveClickHandlers = () => {
    target.removeEventListener('click', click)
  }
}

const popover = {
  bind: function (target, binding) {
    const params = prepareBinding(binding)

    addClickEventListener(target, params)
  },
  unbind: function (target, binding) {
    target.$popoverRemoveClickHandlers()
  }
}

export default popover

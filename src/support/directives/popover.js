import { events } from '../bus'

const defaultPosition = 'bottom'

const prepareBinding = ({ arg = '', modifiers = {}, value = {} }) => {
  let mods = Object.keys(modifiers)
  let name = typeof value === 'object' && value.name ? value.name : arg
  let position = mods[0] || value.position || defaultPosition

  return { name, position, value }
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
    let params = prepareBinding(binding)

    addClickEventListener(target, params)
  },
  unbind: function (target, binding) {
    target.$popoverRemoveClickHandlers()
  }
}

export default popover

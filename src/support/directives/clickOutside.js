export default {
  bind: function (el, binding, vNode) {
    const handler = (e) => {
      if (!el.contains(e.target) && el !== e.target) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    document.addEventListener('click', handler)
  },

  unbind: function (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
}

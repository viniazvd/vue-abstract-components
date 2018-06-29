import props from './props'
import computed from './computed'
import methods from './methods'

const index = {
  name: 'a-tabs',

  props,

  data () {
    return {
      selectedIndex: this.defaultIndex
    }
  },

  computed,

  methods,

  render (h) {
    const tabs = this.$slots.default.filter(component => component.componentOptions)

    const tabList = []
    tabs.forEach((child, index) => {
      const { title, titleSlot, disabled } = child.componentOptions.propsData
      const content = titleSlot ? this.$slots[titleSlot] : title
      const isDisabled = disabled === true || disabled === ''

      tabList.push(this.makeTab(h, content, index, isDisabled))
    })

    const ul = h('ul', this.optionsUl, [ this.$slots.left, tabList, this.$slots.right ])

    return h('div', this.optionsRoot, [ ul, tabs[this.selectedIndex] ])
  }
}

export default index

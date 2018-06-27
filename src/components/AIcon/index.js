import './style.scss'

import Icon from 'vue-svgicon'

const index = {
  name: 'a-icon',

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

  watch: {
    icon (newIcon, oldIcon) {
      if (process.env.NODE_ENV !== 'development' && newIcon !== oldIcon) {
        this.loadIcon()
      }
    }
  },

  mounted () {
    this.loadIcon()
  },

  computed: {
    optionsIcon () {
      return {
        style: { fill: this.color },
        attrs: {
          class: 'c-icon',
          icon: this.icon,
          width: this.size,
          height: this.size
        }
      }
    }
  },

  methods: {
    async loadIcon () {
      await import('../../assets/icons/' + this.icon)
    }
  },

  render (h) {
    const aIcon = [ h(Icon, this.optionsIcon) ]

    return h('div', { attrs: { 'class': 'c-icon' } }, [ aIcon ])
  }
}

export default index

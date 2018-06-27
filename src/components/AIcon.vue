<!--
<template>
  <icon
    class="c-icon"
    :style="{ fill: color }"
    :icon="icon"
    :width="size"
    :height="size"
  />
</template>
-->
<script>
import Icon from 'vue-svgicon'

export default {
  components: { Icon },

  props: {
    icon: {
      type: String,
      required: true
    },
    size: String,
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
      await import('../assets/icons/' + this.icon)
    }
  },

  render (h) {
    const aIcon = [ h('icon', this.optionsIcon) ]

    return h('div', { attrs: { 'class': 'c-icon' } }, [ aIcon ])
  }
}
</script>

<style lang="scss">
.c-icon {
  display: inline-block;
}
</style>

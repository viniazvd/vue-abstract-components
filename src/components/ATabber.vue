<template>
  <div class="c-tabber">
    <div
      v-for="tab in tabs"
      :key="tab.value"
      :ref="tab.value"
      :class="getClasses(tab)"
      @click="changeTab(tab)"
    >
      <a-icon v-if="tab.icon" class="icon" :icon="tab.icon" />
      <span class="text">{{ tab.name }}</span>
    </div>

    <div class="active-border" :style="[activeStyle, borderStyle]"/>
  </div>
</template>

<script>
import AIcon from './AIcon'

export default {
  components: { AIcon },

  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: String,
    isResized: Boolean,
    borderColor: {
      type: [String, Array],
      validator: v => v.length
    }
  },

  data () {
    return {
      activeStyle: {}
    }
  },

  computed: {
    borderStyle () {
      const background = Array.isArray(this.borderColor)
        ? 'linear-gradient(90deg, ' + this.borderColor.join(`, `) + `)`
        : this.borderColor

      return { background }
    }
  },

  watch: {
    activeTab: {
      immediate: true,
      handler: 'getActiveStyle'
    }
  },

  methods: {
    getClasses (tab) {
      return ['tab', {
        '-active': tab.value === this.activeTab,
        '-resized': this.isResized,
        '-disabled': tab.disabled
      }]
    },

    getActiveStyle () {
      this.$nextTick(() => {
        const tabberPosition = this.$el.getBoundingClientRect().left || 0
        const tab = this.$refs[this.activeTab]

        const left = tab ? (tab[0].getBoundingClientRect().left - tabberPosition) + 'px' : 0
        const width = tab ? tab[0].offsetWidth + 'px' : 0
        const activeStyle = { left, width }

        this.activeStyle = activeStyle
      })
    },

    changeTab (tab) {
      if (!tab.disabled) this.$emit('change-tab', tab.value)
    }
  },

  mounted () {
    if (this.isResized) {
      addEventListener('resize', this.getActiveStyle)
    }
  },

  beforeDestroy () {
    if (this.isResized) {
      removeEventListener('resize', this.getActiveStyle)
    }
  }
}
</script>

<style lang="scss">

.c-tabber {
  display: flex;
  position: relative;

  & > .tab {
    display: flex;
    align-items: center;
    opacity: 0.3;
    font-size: 11px;
    cursor: pointer;
    color: #121E48;
    text-transform: uppercase;
    transition: color .3s ease;
    padding: { top: 30px; right: 20px; bottom: 15px; left: 20px; }

    & > .text {
      padding-left: 5px;
      transition: color .3s ease;
    }

    & > .c-icon { transition: fill .3s ease; }

    &:not(.-active):not(.-disabled):hover {
      & > .text { color: red; }
      & > .c-icon > svg { fill: blue !important; }
    }
  }

  & > .-active { opacity: 0.8; }
  & > .-resized { flex-grow: 1; justify-content: center; }
  & > .-disabled{ cursor: no-drop; }

  & > .active-border {
    position: absolute;
    width: 0;
    left: 50%;
    height: 4px;
    bottom: -4px;
    border-radius: 999px;
    transition: left .3s ease, width .3s ease;
    background: linear-gradient(90deg, #BC4CF7 0%, #7D71EF 100%);
  }
}
</style>

<template>
  <div class="c-toggler">
    <div
      v-for="tab in tabs"
      :key="tab.value"
      :ref="tab.value"
      :class="['tab', { '-active': tab.value === activeTab }]"
      @click="$emit('change-tab', tab.value)">
      {{ tab.name }}
    </div>
    <div
      class="toggle"
      :style="toggleStyle"/>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: String
  },

  data () {
    return {
      toggleStyle: {}
    }
  },

  watch: {
    activeTab () {
      this.getToggleStyle()
    }
  },

  methods: {
    getToggleStyle () {
      const tabberPosition = this.$el.getBoundingClientRect().left || 0
      // const { tabs, activeTab, $refs } = this
      const { activeTab, $refs } = this
      const tab = $refs[activeTab]
      const toggleStyle = {
        left: tab ? (tab[0].getBoundingClientRect().left - tabberPosition) + 'px' : 0,
        width: tab ? tab[0].offsetWidth + 'px' : 0
      }
      this.toggleStyle = toggleStyle
    }
  },

  mounted () {
    this.ready = true
    this.getToggleStyle()
    window.addEventListener('resize', this.getToggleStyle)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.getToggleStyle)
  }
}
</script>

<style lang="scss">

.c-toggler {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 2px;

  & > .tab {
    padding: {
      top: 30px;
      right: 20px;
      bottom: 15px;
      left: 20px;
    }
    text-transform: uppercase;
    color: $text-color;
    line-height: 1;
    text-align: center;
    font-weight: 400;
    font-size: 14px;
    transition: color .3s ease;
    cursor: pointer;
    flex-grow: 1;

    &.-active {
      color: green;
      font-weight: 600;
    }
  }

  & > .toggle {
    height: 4px;
    width: 0;
    left: 50%;
    background-color: blue;
    position: absolute;
    bottom: -4px;
    transition: left .3s ease,
                width .3s ease;
  }
}
</style>

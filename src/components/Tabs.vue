<template>
  <ul class="c-tabs">
    <li
      v-for="(tab, index) in tabList"
      v-bind="tab.dataAttrs"
      :key="index"
      :class="['c-tab', { 'active': isActive(index), 'disabled': tab.disabled }]"
      @click="select(index)"
    >
      {{ tab.title }}
    </li>

    <div class="tab-content">
      <slot></slot>
    </div>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      tabList: [],
      activeTabIndex: 0
    }
  },

  mounted () {
    this.select(1)
    this.activeTabIndex = this.getInitialActiveTab()
    this.$root.$on('select-tab', index => this.select(index))
  },

  methods: {
    isActive (index) {
      return this.activeTabIndex === index
    },

    select (index) {
      const tab = this.tabList[index]
      console.log(tab.isDisabled)

      if (!tab.isDisabled) {
        console.log('coe')
        this.activeTabIndex = index
      }
    },

    getInitialActiveTab () {
      const index = this.tabList.findIndex(tab => tab.active)

      return index === -1 ? 0 : index
    }
  }
}
</script>

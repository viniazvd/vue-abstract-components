<template>
  <div
    :class="['a-select', { 'label-margin': label }]"
    v-click-outside="close"
    @click="isOpened = !isOpened"
  >
    <span class="label">{{ label }}</span>

    <section :class="selectedClasses">
      <slot :selected="value">
        <span class="text">{{ selected }}</span>
      </slot>
    </section>

    <section v-if="isOpened" :class="optionsClasses">
      <slot name="options" :options="options">
        <div
          :class="optionClasses"
          v-for="(option, index) in options"
          :key="index"
          @click="selected = options[index]"
        >
          <slot name="option" :option="option">
            <p :class="['text', { 'selected': isSelected === index }]">
              {{ displayBy ? option[displayBy] : option }}
            </p>
          </slot>
        </div>
      </slot>
    </section>
  </div>
</template>

<script>
import clickOutside from '../support/directives/clickOutside'

export default {
  name: 'a-select',

  data () {
    return {
      isOpened: false
    }
  },

  props: {
    label: String,
    options: {
      type: Array,
      required: true
    },
    trackBy: String,
    displayBy: String,
    placeholder: String,
    value: [Object, String]
  },

  directives: { clickOutside },

  computed: {
    selected: {
      get () {
        return this.value
          ? this.displayBy ? this.value[this.displayBy] : this.value
          : '' || this.placeholder
      },
      set (value) {
        this.$emit('update', value)
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },

    selectedClasses () {
      return [ 'selected', {
        '-default': !(this.$slots.default || this.$scopedSlots.default)
      }]
    },

    optionsClasses () {
      return [ 'options', {
        '-default': !(this.$slots.options || this.$scopedSlots.options)
      }]
    },

    optionClasses () {
      return [ 'option', {
        '-default': !(this.$slots.option || this.$scopedSlots.option)
      }]
    },

    isSelected () {
      const position = option => this.trackBy
        ? this.value[this.trackBy] === option[this.trackBy]
        : this.value === option

      return this.options.findIndex(position)
    }
  },

  methods: {
    close () {
      this.isOpened = false
    }
  }
}
</script>

<style lang="scss">
.a-select {
  height: 30px;
  background-color: white;
  border: 1px solid lightgray;
  position: relative;

  & > .label {
    position: absolute;
    top: -20px;
  }

  & > .selected.-default {
    background-color: lightgrey;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  & > .options.-default {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: white;
    z-index: 1;
    transform: translate(0, 0);

    & > .option.-default {
      border: 1px solid darkgray;
      height: 30px;
      display: flex;
      align-items: center;
      padding-left: 10px;
      cursor: pointer;

      & > .text { color: black; }
      & > .selected { color: red; }
    }
  }
}
.label-margin {
  margin-top: 20px;
}
</style>

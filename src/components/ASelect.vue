<template>
  <div
    :class="classes"
    @click="toggle"
    v-click-outside="close"
  >
    <section :class="selectedClasses">
      <slot :selected="value">
        <span class="text">
          {{ selected }}
        </span>

        <!-- <slot name="select-icon">
          <c-icon
            v-if="selectIcon"
            class="icon"
            size="15"
            :icon="selectIcon"
          />
        </slot> -->
      </slot>
    </section>

    <section
      v-if="isOpened"
      class="options"
      :class="optionsClasses"
    >
      <slot
        name="options"
        :options="options"
      >
        <div
          class="option"
          :class="optionClasses"
          v-for="(option, index) in options"
          v-if="clearOnSelect || selectedPosition !== index"
          :key="index"
          @click="select(index)"
        >
          <slot name="option" :option="option">
            <p class="text">
              {{ getOption(option) }}
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
    options: {
      type: Array,
      required: true
    },
    trackBy: String,
    displayBy: String,
    placeholder: String,
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    clearOnSelect: Boolean,
    selectIcon: {
      type: String,
      default: 'chevron-down'
    },
    value: [Object, String]
  },

  directives: { clickOutside },

  computed: {
    selected: {
      get () {
        return this.value
          ? this.displayBy
            ? this.value[this.displayBy]
            : this.value
          : ''
      },
      set (value) {
        this.$emit('update', value)
        this.$emit('input', value)
        this.$emit('change', value)
      }
    },

    classes () {
      const classes = [ 'a-select', {
        '-is-opened': this.isOpened
      }]
      return classes
    },

    selectedClasses () {
      return [ 'selected', {
        '-default':
          !(this.$slots.default || this.$scopedSlots.default)
      }]
    },

    optionsClasses () {
      return [ 'options', {
        '-default':
          !(this.$slots.options || this.$scopedSlots.options)
      }]
    },

    optionClasses () {
      return [ 'option', {
        '-default':
          !(this.$slots.option || this.$scopedSlots.option)
      }]
    },

    selectedPosition () {
      return this.options
        .findIndex(option =>
          this.trackBy
            ? this.value[this.trackBy] === option[this.trackBy]
            : this.value === option
        )
    }
  },

  methods: {
    close () {
      this.isOpened = false
    },

    // clear () {
    //   if (this.clearOnSelect)
    //     this.value = null
    // },

    toggle () {
      this.isOpened = !this.isOpened
    },

    getOption (option) {
      return this.displayBy
        ? option[this.displayBy]
        : option
    },

    select (index) {
      if (
        this.clearOnSelect &&
        this.selectedPosition === index
      ) {
        this.selected = null
        return
      }

      this.selected = this.options[index]
    }
  }
}
</script>

<style lang="scss">
.a-select {
  position: relative;

  & > .selected.-default {
    border: 1px solid black;
    background-color: lightgrey;
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
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px;
    }
  }

  &.-is-opened {}
}
</style>

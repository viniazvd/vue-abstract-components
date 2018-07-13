<template>
  <!-- add input container here -->
  <div :class="containerClasses" v-click-outside="close" @click="isOpened = !isOpened">
    <span class="label">{{ label }}</span>

    <section :class="selectedClasses">
      <slot name="icon">
        <a-icon v-if="icon" :icon="icon" size="15" class="icon" />
      </slot>

      <slot :selected="value">
        <span class="text">{{ selected }}</span>

        <slot name="select-icon">
          <a-icon v-if="selectIcon" class="select-icon" size="15" :icon="iconHandler" />
        </slot>
      </slot>
    </section>

    <section v-if="isOpened" :class="optionsClasses">
      <slot name="options" :options="options">
        <div
          v-for="(option, index) in options"
          :key="index"
          :class="optionClasses"
          @click="selected = options[index]"
        >
          <slot name="option" :option="option">
            <p class="text">{{ getItem(option) }}</p>
            <span :class="{ 'selected': isSelected === index }"></span>
          </slot>
        </div>
      </slot>
    </section>
  </div>
</template>

<script>
import AIcon from './AIcon'
import clickOutside from '../support/directives/clickOutside'

export default {
  components: { AIcon },

  props: {
    label: String,
    options: {
      type: Array,
      required: true
    },
    trackBy: String,
    displayBy: String,
    icon: String,
    selectIcon: {
      type: String,
      default: 'chevron-down'
    },
    placeholder: {
      type: String,
      default: 'Selecione uma opção'
    },
    value: [Object, String]
  },

  data () {
    return {
      isOpened: false
    }
  },

  directives: { clickOutside },

  computed: {
    selected: {
      get () {
        const value = this.options
          .find(option => Object.values(option)
            .find(v => v === this.value[this.displayBy]))

        if (!value) return 'Opção inválida'

        if (this.value) {
          if (this.displayBy && value[this.displayBy]) {
            return value[this.displayBy]
              ? value[this.displayBy]
              : process.env.NODE_ENV === 'development' ? 'error: displayBy prop does not exist' : ''
          } else {
            return this.value
          }
        }

        return this.placeholder || ''
      },
      set (item) {
        // const tracked = this.trackBy ? item[this.trackBy] : item
        // this.$emit('input', tracked)

        this.$emit('input', item)
      }
    },

    containerClasses () {
      return ['a-select', {
        '-label-margin': this.label,
        '-opened': this.isOpened,
        '-closed': !this.isOpened
      }]
    },

    selectedClasses () {
      return [ 'selected', {
        '-slot': this.$slots.default || this.$scopedSlots.default
      }]
    },

    optionsClasses () {
      return [ 'options', {
        '-slot': this.$slots.options || this.$scopedSlots.options
      }]
    },

    optionClasses () {
      return [ 'option', {
        '-slot': this.$slots.option || this.$scopedSlots.option
      }]
    },

    isSelected () {
      return this.options.findIndex(option => {
        return this.trackBy
          ? this.value[this.trackBy] === option[this.trackBy]
          : this.value === option
      })
    },

    iconHandler () {
      return this.isOpened ? 'chevron-down' : 'chevron-up'
    }
  },

  methods: {
    getItem (option) {
      if (this.displayBy) {
        return option[this.displayBy]
          ? option[this.displayBy]
          : process.env.NODE_ENV === 'development' ? 'error: displayBy prop does not exist' : ''
      }

      return option
    },

    close () {
      this.isOpened = false
    }
  }
}
</script>

<style lang="scss">
// @import '../styles/index.scss';

.a-select {
  width: 300px; // tirar dps!
  // border: 1px solid map-get($text-color, base-10);
  position: relative;
  border: 1px solid rgba(18,30,72,0.1);
  border-radius: 5px;

  & > .label {
    position: absolute;
    top: -20px;
  }

  & > .selected {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    height: 40px;

    & > .icon { padding-right: 15px; }

    & > .text {
      opacity: 0.3;
      color: #121E48;
      font-size: 14px;
    }

    & > .select-icon { margin-left: auto; padding-right: 15px; }
  }

  & > .options {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: #fff;
    z-index: 1;
    transform: translate(0, 0);
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.83) 100%);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);

    & > .option {
      display: flex;
      align-items: center;
      padding-left: 15px;
      height: 39px;
      border-bottom: 1px solid gray;
      cursor: pointer;

      &:hover { background-color: grey; }

      & > .text {
        position: relative;
        opacity: 0.8;
        color: #121E48;
        font-size: 14px;
      }

      & > .selected {
        position: absolute;
        color: red;
        background: #f00;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        right: 15px;
      }
    }
  }

  &.-label-margin { margin-top: 20px; }

  &.-closed:hover { border: 1px solid purple; }

  &.-opened:hover {
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.83) 100%);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.2);
  }
}
</style>

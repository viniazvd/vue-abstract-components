<template>
  <label :class="className">
    <span v-if="label" class="label">{{ label }}</span>
    <input type="checkbox" class="input" :checked="value" @change.stop="toggle" />

    <div class="core" :style="coreStyle">
      <div class="button" :style="buttonStyle" />

      <template v-if="checked && unchecked">
        <span v-if="value" class="label -left" :style="labelStyle">{{ checked }}</span>
        <span v-else class="label -right" :style="labelStyle">{{ unchecked }}</span>
      </template>
    </div>
  </label>
</template>

<script>
const px = v => v + 'px'

export default {
  name: 'a-toggle',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hasConfirmation: {
      type: Boolean,
      default: false
    },
    checked: {
      type: String,
      default: 'Ativo'
    },
    unchecked: {
      type: String,
      default: 'Ativo'
    },
    label: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: 40
    },
    width: {
      type: [Number, String],
      default: 130
    },
    margin: {
      type: [Number, String],
      default: 3
    }
  },

  computed: {
    className () {
      const { value, disabled } = this

      return [ 'c-toggle', { '-toggled': value, '-disabled': disabled } ]
    },

    coreStyle () {
      return {
        width: px(this.width),
        height: px(this.height),
        borderRadius: px(Math.round(this.height / 2))
      }
    },

    buttonRadius () {
      return this.height - this.margin * 2
    },

    distance () {
      return px(this.width - this.height + this.margin)
    },

    buttonStyle () {
      return {
        width: px(this.buttonRadius),
        height: px(this.buttonRadius),
        transform: this.value ? `translate3d(${this.distance}, 3px, 0px)` : null
      }
    },

    labelStyle () {
      return { lineHeight: px(this.height) }
    }
  },

  methods: {
    toggle (event) {
      if (this.disabled) return

      this.hasConfirmation
        ? this.$emit('toggled', !this.value)
        : this.$emit('update:value', !this.value)
    }
  }
}
</script>

<style lang="scss">
$c-toggle-font-size: 13px !default;
$c-toggle-label-font-size: 10px !default;

$c-toggle-unchecked-background: #bec1d4 !default;
$c-toggle-checked-background: black !default;
$c-toggle-label-color: #8c92b2 !default;

.c-toggle {
  & {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    user-select: none;
    font-size: $c-toggle-font-size;
    &:not(.-disabled) { cursor: pointer; }
    &.-disabled { cursor: not-allowed; }
  }

  & > .label {
    color: $c-toggle-label-color;
    font-size: $c-toggle-label-font-size;
    text-transform: uppercase;
    margin-bottom: inner-base(0.5);
    display: block;
    line-height: 1;
  }

  & > .input { display: none; }

  & > .core { @extend %c-toggle-core; }

  &.-toggled .core {
    background: $c-toggle-checked-background;
  }
}

%c-toggle-core {
  & {
    display: block;
    position: relative;
    outline: 0;
    margin: 0;
    transition: border-color .3s, background-color .3s;
    will-change: border-color, background-color;
    user-select: none;
    background: $c-toggle-unchecked-background;
  }

  & > .button {
    display: block;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
    z-index: 3;
    transition: transform 0.3s ease;
    transform: translate3d(3px, 3px, 0);
    border-radius: 100%;
    background-color: #fff;
  }

  & > .label {
    position: absolute;
    bottom: 0;
    color: white;
  }

  & > .label.-left { left: 10px; }
  & > .label.-right { right: 10px; }
}
</style>

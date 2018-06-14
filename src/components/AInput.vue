<template>
  <div class="a-input-component">
    <div v-if="!textArea" class="container" :style="styleContainer">
      <span v-if="label" class="label" :style="styleLabel">{{ label }}</span>

      <input
        class="input"
        :style="styleInput"
        :type="type"
        :value="value"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="v => $emit('input', v.target.value)"
      />

      <span
        v-if="touched && required && !isValid"
        class="errors"
        :style="styleError"
      >
        {{ errorMessage }}
      </span>
    </div>

    <div v-else class="container">
      <span v-if="label" class="label">{{ label }}</span>

      <textarea
        cols="30"
        rows="10"
        @input="v => $emit('input', v.target.value)"
      />

      <span
        v-if="touched && required && !isValid"
        class="errors"
        :style="styleError"
      >
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styleContainer: {
      type: Object,
      default: () => ({ 'width': '100%' })
    },
    styleLabel: {
      type: Object,
      default: () => ({ 'paddingRight': '10px' })
    },
    styleInput: {
      type: Object,
      default: () => ({ 'height': '25px' })
    },
    styleError: {
      type: Object,
      default: () => ({ 'color': 'red' })
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: value => 'text|number|email|password|search|url|tel|file|color'.split('|').indexOf(value) > -1
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    icon: String,
    textArea: {
      type: Boolean,
      default: false
    },
    cols: {
      type: String,
      default: '30'
    },
    rows: {
      type: String,
      default: '10'
    },
    isValid: Boolean,
    errorMessage: {
      type: String,
      default: `Campo inválido`
    },
    touched: Boolean
  },

  watch: {
    value () {
      this.$emit('touched')
    }
  }
}
</script>

<style lang="scss">
.a-input-component {
  max-width: 400px;

  .container {
    display: flex;
    justify-content: baseline;
    flex-direction: column;

    .label { text-transform: uppercase; }
    .input {}
    .errors { padding-top: 5px; }
  }
}
</style>

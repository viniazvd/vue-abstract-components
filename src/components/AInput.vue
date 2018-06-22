<template>
  <div class="a-input-component">
    <div v-if="!textArea" class="container" :style="styleContainer">
      <span v-if="label" class="label" :style="styleLabel">{{ label }}</span>

      <input
        class="input"
        :style="styleInput"
        :type="type"
        :value="value"
        :required="isRequired"
        :maxlength="maxlength"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="v => localValue = v.target.value"
      />
    </div>

    <div v-else class="container">
      <span v-if="label" class="label">{{ label }}</span>

      <textarea
        cols="30"
        rows="10"
        @input="v => localValue = v.target.value"
      />
    </div>

    <span
      v-if="touched && isRequired && !isValid"
      class="error"
      :style="styleError"
    >
      {{ errorMessage }}
    </span>
    <span
      v-if="(touched && isRequired && regexValidation && !(!!maskValidation)) && value"
      class="error"
      :style="styleError"
    >
      {{ regexValidation }} não é válido
    </span>
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
    isRequired: {
      type: Boolean,
      default: false
    },
    regexValidation: {
      type: String,
      default: () => ''
    },
    mask: {
      type: String
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
    }
  },

  data () {
    return {
      localValue: '',
      touched: false
    }
  },

  watch: {
    dirty (v) {
      if (v) this.touched = true
    },

    localValue (v) {
      if (this.mask) {
        this.$emit('input', this.masking(this.mask, this.inputValid))
      } else {
        this.$emit('input', this.localValue)
      }
    }
  },

  computed: {
    dirty () {
      return !!this.localValue
    },

    maskValidation () {
      if (this.regexValidation && this.localValue) {
        const isValid = this.$f.regexValidation(this.regexValidation, this.localValue)

        this.$emit('mask-error', !isValid)
        return isValid
      }
    },

    inputValid () {
      return this.localValue.replace(/[^0-9]/g, '')
    },

    maxlength () {
      if (this.mask) {
        const maskLength = this.mask.split('').length
        const divisorLength = this.mask.split().filter(v => v === '#')

        return maskLength - divisorLength
      }
    }
  },

  methods: {
    masking (mask, input = '', divisor = '#') {
      if (!input.length) return ''

      const inputLeft = String(input).split('')
      const masked = char => char === divisor ? inputLeft.shift() : char

      return mask
        .split('')
        .map(masked)
        .join('')
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
    .error { padding-top: 5px; }
  }
}
</style>

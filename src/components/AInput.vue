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
        v-mask="mask"
        @input="v => $emit('input', v.target.value)"
      />
    </div>

    <div v-else class="container">
      <span v-if="label" class="label">{{ label }}</span>

      <textarea cols="30" rows="10" @input="v => $emit('input', v.target.value)" />
    </div>

    <span v-if="isTouched && isRequired && !isFilled" class="error" :style="styleError">
      {{ errorMessage }}
    </span>
    <span v-if="(isTouched && isRequired && regexValidation && !error) && value" class="error" :style="styleError">
      {{ regexValidation }} não é válido
    </span>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

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
    name: {
      type: String,
      required: true
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
    isTouched: {
      type: Boolean,
      default: false
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    regexValidation: {
      type: String,
      default: () => ''
    },
    mask: [String, Array],
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
    isFilled: Boolean,
    errorMessage: {
      type: String,
      default: `Campo vazio ou inválido`
    }
  },

  directives: {
    mask (el, binding) {
      if (!binding.value || !binding.value.length) {
        return
      }
      return mask(el, binding)
    }
  },

  computed: {
    error () {
      if (this.regexValidation && this.value) {
        const isValidRegex = this.$f.regexValidation(this.regexValidation, this.value)
        console.log('oo')

        this.$emit('error', { [this.name]: !isValidRegex })
        return isValidRegex
      }
    },

    maxlength () {
      if (this.mask) {
        const maskLength = this.mask.split('').length
        const divisorLength = this.mask.split().filter(v => v === '#')

        return maskLength - divisorLength
      }
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

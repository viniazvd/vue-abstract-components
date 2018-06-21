<template>
  <div class="a-input-component">
    <div v-if="!textArea" class="container" :style="styleContainer">
      {{ JSON.stringify(mask) }} {{ mask }}
      <span v-if="label" class="label" :style="styleLabel">{{ label }}</span>

      <input
        class="input"
        :style="styleInput"
        :type="type"
        :value="value"
        v-mask="mask"
        :required="isRequired"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="v => $emit('input', v.target.value)"
      />
    </div>

    <div v-else class="container">
      <span v-if="label" class="label">{{ label }}</span>

      <textarea
        cols="30"
        rows="10"
        @input="v => $emit('input', v.target.value)"
      />
    </div>

    <span
      v-if="touched && isRequired && !isValid"
      class="error"
      :style="styleError"
    >
      {{ errorMessage }}
    </span>
    <!-- <span
      v-if="(touched && isRequired && !(!!validation)) && value"
      class="error"
      :style="styleError"
    >
      {{ regexValidation }} não é válido
    </span> -->
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: { mask },

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
      type: [String, Boolean],
      default: () => false
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
      touched: false
    }
  },

  watch: {
    dirty (v) {
      if (v) this.touched = true
    },

    value (v) {
      if (this.mask) {
        this.$emit('input', this.inputValid)
      }
    }
  },

  computed: {
    dirty () {
      return !!this.value
    }

    // validation () {
    //   if (this.regexValidation && this.value) {
    //     return this.$f.regexValidation(this.regexValidation, this.value)
    //   }
    // }
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

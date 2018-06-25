<template>
  <div id="app">
    <form>
      <a-input
        name="value1"
        label="Gender"
        is-required
        v-model="form.value1"
        regex-validation="gender"
        :is-filled="isFilled.value1"
        :is-touched="isTouched.value1"
      />
        <!-- @error="syncError" -->

      <a-input
        name="value2"
        label="coe"
        v-model="form.value2"
      />

      <a-input
        name="value3"
        label="E-mail"
        is-required
        v-model="form.value3"
        regex-validation="email"
        :is-filled="isFilled.value3"
        :is-touched="isTouched.value3"
        @error="syncError"
      />

      <a-input
        name="value4"
        label="Date"
        is-required
        v-model="form.value4"
        mask="##/##/####"
        :is-filled="isFilled.value4"
      />
      <button :disabled="isDisabled">BOTÃO BOLADÃO ESTÁ: {{ formFilled && hasErrors && formDirty }}</button>
    </form>
  </div>
</template>

<script>
import formValidations from './support/mixins/formValidations'

export default {
  name: 'vue-abstract-component',

  mixins: [formValidations()],

  components: {
    AInput: () => import('./components/AInput')
  },

  data () {
    return {
      requireds: ['value1', 'value3', 'value4'],
      hasRegex: ['value1', 'value3'],
      form: {
        value1: 'coe',
        value2: 'valor2',
        value3: '',
        value4: ''
      }
    }
  }
}
</script>

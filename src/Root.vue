<template>
  <div id="app">
    <form>
      <a-input
        name="value1"
        label="Titulo 1"
        v-model="form.value1"
        is-required
        regex-validation="gender"
        error-message="Coé, Campo value1 tá inválido mané!"
        :is-valid="formValidator.value1"
        @mask-error="checkMaskError"
      />

      <a-input
        name="value2"
        label="Titulo 2"
        v-model="form.value2"
      />

      <a-input
        name="value3"
        label="Titulo 3"
        v-model="form.value3"
        is-required
        regex-validation="email"
        error-message="Campo value3 tá inválido!"
        :is-valid="formValidator.value3"
        @mask-error="checkMaskError"
      />

      <a-input
        name="value4"
        label="Titulo 4"
        v-model="form.value4"
        is-required
        :is-valid="formValidator.value4"
        error-message="TÀ VAZIO ANIMAL!"
      />
      {{ isFormValid }} {{ maskValid }} {{ formDirty }}
      <button :disabled="!(isFormValid && maskValid && formDirty)">BOTAO BOLADAO</button>
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
      form: {
        value1: 'coe',
        value2: 'valor2',
        value3: '',
        value4: 'val44or4'
      },
      errors: {
        value1: false,
        value3: false,
        value4: false
      }
    }
  },

  computed: {
    maskValid () {
      return !Object.entries(this.errors).map(([key, value]) => value).some(v => v)
    }
  },

  methods: {
    checkMaskError (e) {
      this.errors = { ...this.errors, ...e }
    }
  }
}
</script>

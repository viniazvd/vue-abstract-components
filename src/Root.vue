<template>
  <div id="app">
    <form>
      <a-input
        label="Titulo 1"
        v-model="form.value1"
        is-required
        regex-validation="gender"
        :is-valid="formValidator.value1"
        error-message="Coé, Campo value1 tá inválido mané!"
      />

      <a-input
        label="Titulo 2"
        v-model="form.value2"
      />

      <a-input
        label="Titulo 3"
        v-model="form.value3"
        is-required
        regex-validation="email"
        :is-valid="formValidator.value3"
        error-message="Campo value3 tá inválido!"
      />

      <a-input
        label="Titulo 4"
        v-model="form.value4"
        is-required
        :is-valid="formValidator.value4"
        error-message="TÀ VAZIO ANIMAL!"
      />

      <button :disabled="!isFormValid">BOTAO BOLADAO</button>
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
      }
    }
  },

  methods: {
    // checkError (v) {
    //   console.log(v)
    // }
  }
}
</script>

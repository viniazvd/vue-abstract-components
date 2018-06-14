<template>
  <div id="app">
    <form>
      <a-input
        label="titulo"
        v-model="form.value1"
        required
        :is-valid="formValidator.value1"
        error-message="Coé, Campo value1 tá inválido mané!"
        :touched="formTouched.value1"
        @touched="formTouched.value1 = true"
      />

      <a-input
        label="titulo"
        v-model="form.value2"
        @touched="formTouched.value2 = true"
      />

      <a-input
        label="titulo"
        v-model="form.value3"
        required
        :is-valid="formValidator.value3"
        error-message="Campo value3 tá inválido!"
        :touched="formTouched.value3"
        @touched="formTouched.value3 = true"
      />

      <a-input
        label="titulo"
        v-model="form.value4"
        @touched="formTouched.value4 = true"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: 'vue-abstract-component',

  components: {
    AInput: () => import('./components/AInput')
  },

  data () {
    return {
      form: {
        value1: '',
        value2: 'valor2',
        value3: '',
        value4: 'valor4'
      },
      formTouched: {}
    }
  },

  mounted () {
    this.formTouched = this.toucher
  },

  computed: {
    formValidator () {
      const requireds = ['value1', 'value3']

      return this.$f.formValidator(requireds, this.form)
    },

    toucher () {
      return this.$f.toucher(this.form)
    },

    isformTouched () {
      return !Object.entries(this.formTouched).map(([ key, value ]) => ({ key, value })).every(({ value }) => !value)
    }
  }
}
</script>

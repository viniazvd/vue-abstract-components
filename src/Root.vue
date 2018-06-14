<template>
  <div id="app">
    <form>
      <a-input
        label="titulo"
        v-model="form.value1"
        required
        :is-valid="formValidator.value1"
        error-message="Coé, Campo value1 tá inválido mané!"
        :touched="formToucher.value1"
        @touched="formToucher.value1 = true"
      />

      <a-input
        label="titulo"
        v-model="form.value2"
        @touched="formToucher.value2 = true"
      />

      <a-input
        label="titulo"
        v-model="form.value3"
        required
        :is-valid="formValidator.value3"
        error-message="Campo value3 tá inválido!"
        :touched="formToucher.value3"
        @touched="formToucher.value3 = true"
      />

      <a-input
        label="titulo"
        v-model="form.value4"
        @touched="formToucher.value4 = true"
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
      formToucher: {}
    }
  },

  mounted () {
    this.formToucher = this.toucher
  },

  computed: {
    formValidator () {
      const requireds = ['value1', 'value3']

      return this.$f.formValidator(requireds, this.form)
    },

    toucher () {
      return this.$f.toucher(this.form)
    },

    formTouched () {
      return !Object.entries(this.formToucher).map(([ key, value ]) => ({ key, value })).every(({ value }) => !value)
    }
  }
}
</script>

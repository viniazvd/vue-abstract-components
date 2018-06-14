<template>
  <div id="app">
    <form>
      <a-input
        label="titulo"
        v-model="form.value1"
        required
        :is-valid="formValidator.value1"
        error-message="Coé, Campo value1 tá inválido mané!"
        :touched="touched"
        @touched="touched = true"
      />

      <a-input
        label="titulo"
        v-model="form.value2"
        @touched="touched = true"
      />

      <a-input
        label="titulo"
        v-model="form.value3"
        required
        :is-valid="formValidator.value3"
        error-message="Campo value3 tá inválido!"
        :touched="touched"
        @touched="touched = true"
      />

      <a-input
        label="titulo"
        v-model="form.value4"
        @touched="touched = true"
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
        value3: 'valor3',
        value4: 'valor4'
      },
      touched: false
    }
  },

  computed: {
    formValidator () {
      const requireds = ['value1', 'value3']

      return this.$f.formValidator(requireds, this.form)
    }
  }
}
</script>

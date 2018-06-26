<template>
  <div id="app">
    <form @submit.prevent="submit">
      <a-input
        name="value1"
        label="Gender"
        v-model="form.value1"
        regex-validation="gender"
        :is-required="formRequired.value1"
        :is-touched.sync="formTouched.value1"
        @error="syncError"
      />

      <a-input name="value2" label="coe" v-model="form.value2" />

      <a-input
        name="value3"
        label="E-mail"
        v-model="form.value3"
        regex-validation="email"
        :is-required="formRequired.value3"
        :is-touched.sync="formTouched.value3"
        @error="syncError"
      />

      <a-input
        name="value4"
        label="Date"
        v-model="form.value4"
        mask="##/##/####"
        :is-required="formRequired.value4"
        :is-touched.sync="formTouched.value4"
      />
      <button :disabled="isDisabled">
        BOTÃO BOLADÃO FIRMÃO ESTÁ: {{ formFilled && hasErrors && formDirty }}
      </button>
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
        value4: ''
      }
    }
  },

  methods: {
    submit () {
      this.allTouched()

      this.$nextTick(() => {
        if (this.hasErrors === false) {
          alert('COE, FOI MANÉ!')
        }
      })
    }
  }
}
</script>

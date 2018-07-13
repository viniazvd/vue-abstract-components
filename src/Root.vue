<template>
  <div id="app">
    <a-title size="1" color="red" icon="bug">COE MANÉÉÉÉ</a-title>

    <tabs>
      <tab title="COE">COE SELECIONADO</tab>
      <tab title="MANÉ">MANÉ SELECIONADO</tab>
      <tab title="BOLADAO">BOLADAO SELECIONADO</tab>
    </tabs>

    <a-stepper :current="1" :total="3" />

    <a-click-outside :handler="handleClickOutside">
      <a-button icon="bug">click outside!</a-button>
    </a-click-outside>

    <a-spinner size="md" />
    <a-spinner size="md" slot="message">COE, its me</a-spinner>

    <a-toggle
      :value.sync="toggled"
      has-confirmation
      checked="CHECKED"
      unchecked="UNCHECKED"
      @toggled="handlerToggle"
    />

    <a-button @click="isOpen = !isOpen">OPEN FORM BOLADAO</a-button>
    <a-modal :is-open="isOpen" @close="isOpen = !isOpen">
      <a-card>
        <form @submit.prevent="submit">
          <a-input
            name="value1"
            label="Gender"
            icon="chevron-down"
            v-model="form.value1"
            regex-validation="gender"
            :is-required="formRequired.value1"
            :is-touched.sync="formTouched.value1"
            @error="syncError"
          />

          <a-input name="value2" label="coe" v-model="form.value2" text-area />

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

          <a-select
            label="Mané"
            icon="bug"
            v-model="form.value5"
            :options="options"
            track-by="id"
          />

          <button :disabled="isDisabled">EN-VIADO</button>
        </form>
      </a-card>
    </a-modal>

    <a-button alternative v-popover.right="{ name: 'coe' }">Toggle popover</a-button>

    <a-popover name="coe">
      OPIA hehehe
    </a-popover>
  </div>
</template>

<script>
import { Tabs, Tab } from './components/ATabber'

import formValidations from './support/mixins/formValidations'

export default {
  name: 'vue-abstract-component',

  mixins: [formValidations()],

  components: {
    ACard: () => import('./components/ACard'),
    AInput: () => import('./components/AInput'),
    ASelect: () => import('./components/ASelect'),
    AButton: () => import('./components/AButton'),
    ATitle: () => import('./components/ATitle'),
    AStepper: () => import('./components/AStepper'),
    AClickOutside: () => import('./components/AClickOutside'),
    AToggle: () => import('./components/AToggle'),
    AModal: () => import('./components/AModal'),
    ASpinner: () => import('./components/ASpinner'),
    APopover: () => import('./components/APopover'),
    Tabs,
    Tab
  },

  data () {
    return {
      requireds: ['value1', 'value3', 'value4', 'value5'],
      form: {
        value1: 'coe',
        value2: 'valor2',
        value3: '',
        value4: '',
        value5: ''
      },
      options: [
        { id: 1, label: 'label-coe1' },
        { id: 2, name: 'name-coe2', label: 'label-coe2' },
        { id: 3, name: 'name-coe3', label: 'label-coe3' }
      ],
      toggled: false,
      isOpen: false
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
    },

    handleClickOutside (e) {
      // console.log('why did you touch outside?')
    },

    handlerToggle (e) {
      const confirmed = confirm('confirma msm, bicho?')
      if (confirmed) this.toggled = !this.toggled
    },

    toggle (e) {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

const formDirty = () => {
  return {
    data () {
      return {
        copyForm: {},
        errors: {},
        formDirty: false,
        formTouched: {}
      }
    },

    created () {
      if (this.form) this.copyForm = this.$f.clone(this.form)
      if (this.form) this.formTouched = this.setTouched(Object.keys(this.form))
    },

    watch: {
      isDirty (v) {
        if (!v && !this.formDirty) this.formDirty = true
      }
    },

    computed: {
      isDirty () {
        return this.$f.equals(this.copyForm, this.form)
      },

      formRequired () {
        return this.$f.formValidator(this.requireds, this.form)
      },

      hasErrors () {
        if (this.$f.isValid(this.errors)) {
          return Object.entries(this.errors).map(([key, value]) => value).some(v => v)
        }

        return false
      },

      formFilled () {
        return this.$f.isFormValid(this.requireds, this.form)
      },

      isDisabled () {
        return !(this.formFilled && !this.hasErrors && this.formDirty)
      }
    },

    methods: {
      syncError (error) {
        this.errors = { ...this.errors, ...error }
      },

      setTouched (form) {
        return form.reduce((acc, field) => {
          acc[field] = false

          return acc
        }, {})
      },

      allTouched () {
        this.formTouched = Object.entries(this.formTouched).reduce((acc, [key, value]) => {
          acc[key] = true

          return acc
        }, {})
      },

      checkErrors () {
        return Object.entries(this.formTouched).every(([key, value]) => value)
      }
    }
  }
}

export default formDirty

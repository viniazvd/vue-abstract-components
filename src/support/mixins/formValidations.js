const formDirty = () => {
  return {
    data () {
      return {
        copyForm: {},
        errors: {},
        formDirty: false
      }
    },

    created () {
      this.copyForm = this.$f.clone(this.form)
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

      isFilled () {
        return this.$f.formValidator(this.requireds, this.form)
      },

      isTouched () {
        return this.hasRegex.reduce((acc, field) => {
          acc[field] = false

          return acc
        }, {})
      },

      hasErrors () {
        return !Object.entries(this.errors).map(([key, value]) => value).some(v => v)
      },

      formFilled () {
        return this.$f.isFormValid(this.requireds, this.form)
      },

      isDisabled () {
        return !(this.formFilled && this.hasErrors && this.formDirty)
      }
    },

    methods: {
      syncError (e) {
        this.errors = { ...this.errors, ...e }
      }
    }
  }
}

export default formDirty

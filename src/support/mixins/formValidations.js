const formDirty = form => {
  return {
    data () {
      return {
        copyForm: {},
        formDirty: false
      }
    },

    created () {
      this.copyForm = this.$f.clone(this.form)
    },

    watch: {
      isDirty (v) {
        if (!v) this.formDirty = true
      }
    },

    computed: {
      isDirty () {
        return this.$f.equals(this.copyForm, this.form)
      },

      formValidator () {
        return this.$f.formValidator(this.requireds, this.form)
      },

      isFormValid () {
        return this.$f.isFormValid(this.requireds, this.form)
      }
    }
  }
}

export default formDirty

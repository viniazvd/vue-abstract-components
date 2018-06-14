const formTouched = form => {
  return {
    data () {
      return {
        formTouched: {}
      }
    },

    mounted () {
      const $this = this

      this.formTouched = $this.toucher
    },

    computed: {
      toucher () {
        const $this = this

        return $this.$f.toucher($this.form)
      },

      isformTouched () {
        const $this = this

        return !Object.entries($this.formTouched).map(([ key, value ]) => ({ key, value })).every(({ value }) => !value)
      }
    }
  }
}

export default formTouched

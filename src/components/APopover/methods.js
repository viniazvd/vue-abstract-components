import { events } from '../../support/bus'

const directions = {
  left: [-1, 0],
  right: [1, 0],
  top: [0, 1],
  bottom: [0, -1]
}

const methods = {
  showEventListener (event) {
    if (this.visible) {
      events.$emit(this.hideEventName)
      return
    }

    this.$nextTick(() => {
      const { target, name, position, align } = event

      if (name === this.name) {
        const direction = directions[position]
        this.positionClass = `position-${position}`
        this.visible = true

        this.$nextTick(() => {
          this.$emit('show', event)

          this.$nextTick(() => {
            const _position = this.getPosition(target, this.$refs.popover, direction, align)
            this.position = { left: `${_position.left}px`, top: `${_position.top}px` }
          })
        })
      }
    })
  },

  getPosition (target, popover, direction, align) {
    this.align = align

    const targetData = target.getBoundingClientRect()
    const PopoverData = popover.getBoundingClientRect()

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft

    const offsetLeft = targetData.left + scrollLeft
    const offsetTop = targetData.top + scrollTop

    const shiftY = 0.5 * (PopoverData.height + targetData.height)

    let centerX = 0
    if (align === 'center') {
      centerX = offsetLeft - 0.5 * (PopoverData.width - targetData.width)
    } else {
      centerX = offsetLeft - 0.5 * (0 - targetData.width)
    }

    const centerY = offsetTop + targetData.height - shiftY

    const x = direction[0] * 0.5 * (PopoverData.width + targetData.width)
    const y = direction[1] * shiftY

    return { left: centerX + x, top: centerY - y }
  },

  hideEventListener (event) {
    if (this.visible) {
      this.visible = false
      this.$emit('hide', event)
    }
  },

  clickEscape (event) {
    if (event.key === 'Escape') {
      this.visible = false
      this.$emit('hide', event)
    }
  }
}

export default methods

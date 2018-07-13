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
        this.alignClass = `align-${align}`
        this.visible = true

        this.$nextTick(() => {
          this.$emit('show', event)

          this.$nextTick(() => {
            const _position = this.getPosition(target, this.$refs.dropdown, direction, align)

            if (align === 'right') { _position.left = 590 }
            if (align === 'left') { _position.left = 450 }

            this.position = { left: `${_position.left}px`, top: `${_position.top}px` }
          })
        })
      }
    })
  },

  getAlign (target) {

  },

  getPosition (target, dropdown, direction, align) {
    const trRect = target.getBoundingClientRect()
    const ddRect = dropdown.getBoundingClientRect()

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft

    const offsetLeft = trRect.left + scrollLeft
    const offsetTop = trRect.top + scrollTop

    const shiftY = 0.5 * (ddRect.height + trRect.height)

    const centerX = offsetLeft - 0.5 * (ddRect.width - trRect.width)
    const centerY = offsetTop + trRect.height - shiftY

    let x = 0
    if (align === 'center') {
      x = direction[0] * 0.5 * (ddRect.width + trRect.width)
    } else if (align === 'left') {
      console.log(ddRect.width + trRect.width)
      x = direction[0] * 0.5 * (ddRect.width + trRect.width / 2)
    } else {
      x = direction[0] * 0.5 * (ddRect.width + trRect.width)
    }

    let y = direction[1] * shiftY

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

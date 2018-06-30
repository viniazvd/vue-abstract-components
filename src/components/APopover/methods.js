import { events } from './bus'

const pointerSize = 6
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
      let { target, name, position } = event
      if (name === this.name) {
        let direction = directions[position]
        this.positionClass = `dropdown-position-${position}`
        this.visible = true
        this.$nextTick(() => {
          this.$emit('show', event)

          this.$nextTick(() => {
            let position = this.getDropdownPosition(target, this.$refs.dropdown, direction)

            this.position = { left: `${position.left}px`, top: `${position.top}px` }
          })
        })
      }
    })
  },

  hideEventListener (event) {
    if (this.visible) {
      this.visible = false
      this.$emit('hide', event)
    }
  },

  getDropdownPosition (target, dropdown, direction) {
    let trRect = target.getBoundingClientRect()
    let ddRect = dropdown.getBoundingClientRect()

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft

    let offsetLeft = trRect.left + scrollLeft
    let offsetTop = trRect.top + scrollTop

    let shiftY = 0.5 * (ddRect.height + trRect.height)

    let centerX = offsetLeft - 0.5 * (ddRect.width - trRect.width)
    let centerY = offsetTop + trRect.height - shiftY

    let x = direction[0] * 0.5 * (ddRect.width + trRect.width)
    let y = direction[1] * shiftY

    if (this.pointer) {
      x += direction[0] * pointerSize
      y += direction[1] * pointerSize
    }

    return { left: centerX + x, top: centerY - y }
  }
}

export default methods

function viewBox (props) {
  const ratio = 0.825 * props.options[props.size]
  return [0, 0, ratio, ratio].join(' ')
}

function width (props) {
  return props.options[props.size] + 'px'
}

function pos (props) {
  return -0.125 * props.options[props.size]
}

function radius (props) {
  return 0.25 * props.options[props.size]
}

function strokeWidth (props) {
  const ratio = 0.05 * props.options[props.size]
  return ratio < 1 ? 1 : ratio
}

function uniqClass (props) {
  return '-' + props.size
}

export const transform = (props) => {
  const ratio = (0.825 * props.options[props.size]) / 2
  return `translate(${ratio}, ${ratio})`
}

export const optionsCircle = (props) => {
  return {
    staticClass: 'a-spinner-circle',
    class: uniqClass(props),
    attrs: {
      'stroke-width': strokeWidth(props),
      x: pos(props),
      y: pos(props),
      r: radius(props)
    }
  }
}

export const optionsSvg = (context) => {
  return {
    staticClass: 'a-spinner',
    attrs: {
      width: width(context),
      height: width(context),
      viewBox: viewBox(context)
    }
  }
}

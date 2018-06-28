const makeIcon = (h, { props }) => AIcon => {
  const options = {
    attrs: { class: 'icon' },
    props: { icon: props.icon, iconSize: props.iconSize }
  }

  return props.icon ? [ h(AIcon, options) ] : false
}

export default makeIcon

// imports..

// https://repl.it/@viniazvd/isValid
const isValid = value => {
  if (Array.isArray(value)) return !!value.length
  if (typeof value === 'object') return !!Object.keys(value).length
  if (typeof value === 'string') return !!value.length
  if (typeof value === 'number') return !!value
  return !!value
}

const clone = data => JSON.parse(JSON.stringify(data))

// https://repl.it/@viniazvd/compare-objects (ft. -@woods)
const equals = (obj1, obj2) => {
  const isObject = (data) => typeof (data) === 'object'
  const hasOwnProperty = (obj1, obj2, key) => obj1.hasOwnProperty(key) === obj2.hasOwnProperty(key)

  return Object.keys(obj1).every(key => {
    if (!hasOwnProperty(obj1, obj2, key)) return false

    return isObject(obj1[key])
      ? equals(obj1[key], obj2[key])
      : obj1[key] === obj2[key]
  })
}

// https://repl.it/@viniazvd/translateEntity (ft. -@lubien)
const translateEntity = (labels, entity) => {
  return labels
    .map(([propName, mappedName]) => ({
      name: mappedName,
      value: entity[propName]
    }))
}

// https://repl.it/@viniazvd/isFormValid (ft. -@lubien)
const isFormValid = (requireds = [], form = []) => {
  const isValid = prop => form.some(obj => obj[prop])

  return requireds.every(isValid)
}

// https://repl.it/@viniazvd/final-formValidator (ft. -@lubien)
const formValidator = (requireds, obj, x = new Set(requireds)) =>
  Object
    .entries(obj)
    .reduce((acc, [key, value]) => {
      acc[key] = !!(x.has(key) && value)
      return acc
    }, {})

const functions = {
  isValid,
  clone,
  equals,
  translateEntity,
  isFormValid,
  formValidator
}

export default Vue => {
  Object.defineProperty(Vue.prototype, '$f', {
    get () {
      return functions
    }
  })
}

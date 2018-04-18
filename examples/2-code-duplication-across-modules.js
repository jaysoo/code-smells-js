// @flow

function toUpper(x: null | string) {
  if (x === null) {
    return x
  } else {
    return x.toUpperCase()
  }
}

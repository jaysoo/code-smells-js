// @flow

function toUpper1(x: null | string) {
  if (x === null) {
    return x
  } else {
    return x.toUpperCase()
  }
}

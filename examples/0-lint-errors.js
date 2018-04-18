import * as React from 'react'

/* ------------------------------------------------------------------------------------------------------------------
 * This file demonstrates code smells that can be caught or fixed with eslint.
 *
 * Run with:
 *   `yarn eslint examples/0-lint-errors.js`
 *
 * Fix with:
 *   `yarn eslint examples/0-lint-errors.js --fix`
 * ------------------------------------------------------------------------------------------------------------------ */

// no-var
// Do not use var since they can lead to weird ordering issues.
// We should use const/let instead of var.
// This can be auto-fixed by eslint.
var ex1 = 'Hello'
console.log(ex1)

/* ------------------------------------------------------------------------------------------------------------------ */

// no-cond-assign
// Don't allow assignments in conditions.
// This is almost always a mistake.

let ex2 = Math.random()
if (ex2 = 0) {
  console.log('b was zero!')
}

/* ------------------------------------------------------------------------------------------------------------------ */

// eqeqeq
// Don't use == and != since they usual lead to errors.

const ex3 = true
if (ex3 == 1) {
  console.log('truthy')
}

if (ex3 != null) {
  console.log('falsy')
}

/* ------------------------------------------------------------------------------------------------------------------ */

// no-unused-vars
// Unused variables add unnecessary code bloat.

const ex3_a = 1
function ex3_b() {}

// But unused var in rest operator are okay.
// These are used to clone an object without certain keys.
const ex3_c = { x: 1, y: 2, z: 3 }
const { x, ...ex3_d } = ex3_c
console.log(ex3_d)

/* ------------------------------------------------------------------------------------------------------------------ */

// Not using parenthesis when newing objects can lead to errors when not using semi-colons.

class Ex4 {}
const ex4_a = new Ex4
console.log(ex4_a)

/* ------------------------------------------------------------------------------------------------------------------ */

// Using deprecated callee and caller feature can lead to bugs in different browsers.

function ex5() {
  console.log(arguments.callee, arguments.caller)
}
ex5()

/* ------------------------------------------------------------------------------------------------------------------ */

// no-unreachable
// Unreachable code is usually a logical bug.

function ex6(x) {
  return x * x
  console.log('cannot reach here!')
}
ex6(2)

/* ------------------------------------------------------------------------------------------------------------------ */

// no-throw-literal
// Unnecessary return may signal logic errors, at least a code bloat.

function ex7() {
  console.log('called!')
  return
}
ex7()

/* ------------------------------------------------------------------------------------------------------------------ */

// no-restricted-globals
// Some browsers have global, mutable objects that have local equivalents. It is safer to use the local variants.
const Ex8 = () => (
  <input onChange={() => {
    // Should use the event object that is passed to the handler instead.
    console.log(event.target.value)
  }}/>
)
console.log(<Ex8/>)

/* ------------------------------------------------------------------------------------------------------------------ */

// no-useless-computed-key
// Warns and fixes useless computed keys (via --fix).
const ex9 = {
  ['a']: 1 // shoudl be `a: 1`
}
console.log(ex9)

/* ------------------------------------------------------------------------------------------------------------------ */

// no-whitespace-before-property
// The white spaces make code harder to read.
// This can be fixed automatically via --fix.
const ex10 = { a: { b: { c: 1 } } }
console.log(ex10. a. b. c)

/* ------------------------------------------------------------------------------------------------------------------ */

// import/first
// Imports should be at the top of module. Otherwise it is hard to see what are all being imported.
// This can be fixed via --fix
import { render } from 'react-dom'

// import/no-webpack-loader-syntax
// Do not use webpack syntax in imports. Add them to the webpack config instead.
import x from 'my-loader!./my-thing'


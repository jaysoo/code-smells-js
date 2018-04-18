const CONFUSING_GLOBALS = require('./.confusing-globals')

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  parser: 'babel-eslint',
  plugins: ['flowtype', 'react', 'import', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    // array methods must return
    'array-callback-return': 'warn',

    // default case required in switch
    'default-case': ['warn', { commentPattern: '^no default$' }],

    // must use === and !==
    eqeqeq: ['warn', 'allow-null'], // supports--fix

    // GOOD: new Thing() ... BAD: new Thing
    'new-parens': 'error', // supports--fix

    // disallow the use of arguments.caller or arguments.callee
    // This has been deprecated in ES5.
    'no-caller': 'warn',

    // disallow assignment operators in conditional expressions
    // e.g. if (x = 1)
    'no-cond-assign': 'error',

    // disallows use characters in ASCII range 0-31 in regex
    // this is usually a typo on part of the dev
    'no-control-regex': 'error',

    // cannot reused class member name
    'no-dupe-class-members': 'error',

    // cannot reused key in JSON
    'no-dupe-keys': 'error',

    // cannot reused case in switch
    'no-duplicate-case': 'error',

    // empty character classes in regular expressions do not match anything
    'no-empty-character-class': 'warn',

    // disallows empty destructuring pattern
    // BAD: const {} = x
    'no-empty-pattern': 'warn',

    // disallows eval()
    'no-eval': 'warn',

    // cannot reassign error variable in catch clause
    'no-ex-assign': 'warn',

    // cannot extend native types
    'no-extend-native': 'warn',

    // disallows uses of .bind() that does not use `this`
    'no-extra-bind': 'error', // supports --fix

    // disallows unnecessary labels for break and continue
    'no-extra-label': 'error', // supports --fix

    // disallows fallthroughs in switch unless commented otherwise
    'no-fallthrough': ['error', { commentPattern: 'break[\\s\\w]*omitted' }],

    // disallows reassigning function declarations
    'no-func-assign': 'error',

    // cannot use eval-like expressions
    // BAD: setTimeout("alert('Hi!')", 100)
    'no-implied-eval': 'error',

    // prevents bad regex in constructor
    'no-invalid-regexp': 'error',

    // no trailing semis
    'no-extra-semi': 'warn', // supports --fix

    // disallows __iterator__, which isn't standard
    'no-iterator': 'error',

    // disallows labels, except in loops
    'no-labels': ['warn', { allowLoop: true, allowSwitch: false }],

    'no-lone-blocks': 'warn',

    // functions in loops usually have unintended behaviour due to the closure formed over loop variables.
    'no-loop-func': 'error',

    // disallows mixing of operators that may have confusing precedence rules
    // increases code readability
    'no-mixed-operators': [
      'warn',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof']
        ],
        allowSamePrecedence: true
      }
    ],

    // warns on numbers leading with 0 since they are usually a mistake
    // e.g. 071 === 57
    'no-octal': 'warn',

    // converts `/foo   /` to `/foo {3}/`
    'no-regex-spaces': 'warn', // supports --fix

    // These have no effect, and usually are a mistake.
    // e.g. `x = x` and `if (x === x)`
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',

    // Cannot reassign restricted variables... e.g. `undefined`
    'no-shadow-restricted-names': 'error',

    // BAD: if (!k in obj)
    // GOOD: if (!(k in obj))
    'no-unsafe-negation': 'warn', // supports --fix

    // removes unnecessary return at end of block
    'no-useless-return': 'warn', // supports --fix

    // disallows usages of undeclared variable
    'no-undef': 'error',

    // disallows specific global variables from being used
    'no-restricted-globals': ['error'].concat(CONFUSING_GLOBALS),

    'no-unreachable': 'warn',

    // warn on unused variables, except for rest expression
    // sometimes you use rest to copy object without specific keys
    'no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],

    'no-useless-computed-key': 'warn', // supports --fix

    // changes var to let
    // removes need for no-use-before-define and no-redeclare
    'no-var': 'warn', // supports --fix

    'no-whitespace-before-property': 'warn', // supports -fix

    'rest-spread-spacing': ['warn', 'always'],

    // These are here so React being unused in JSX files are okay.
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',

    // https://github.com/benmosher/eslint-plugin-import
    'import/first': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-amd': 'error',

    // Flow support
    // https://github.com/gajus/eslint-plugin-flowtype
    'flowtype/define-flow-type': 'warn',
    'flowtype/require-valid-file-annotation': ['warn', 'always'],
    'flowtype/use-flow-type': 'warn',
  }
}

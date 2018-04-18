# Code smells

This repository is a demonstration of common code smells, and how each tool may help combat them.

## eslint

Eslint can find, and even fix, many JavaScript problems.

To show warnings and errors:

```
yarn eslint examples/0-lint-errors.js
```

To auto-fix certain problems:

```
yarn eslint examples/0-lint-errors.js --fix
```

Then you can see the difference:

```
git diff
```

## Code climate

[https://codeclimate.com/](https://codeclimate.com/)

### Features

- Supports eslint (including `.eslintrc.js`)
- Has advanced [configuration options](https://docs.codeclimate.com/docs/advanced-configuration#section-exclude-patterns)

## Codefactor

[https://www.codefactor.io](https://www.codefactor.io)

### Features

- Supports eslint (but not `.eslintrc.js`... must use `.eslintrc` which is less flexible)
- Configuration is limited, checks are all or nothing.
  e.g. duplication does not support threshold, so cannot apply [Rule of Three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
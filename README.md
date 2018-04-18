# Code smells

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f7cc93bce975462dae52b03d3bfc3493)](https://www.codacy.com/app/jaysoo/code-smells-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jaysoo/code-smells-js&amp;utm_campaign=Badge_Grade)
[![CodeFactor](https://www.codefactor.io/repository/github/jaysoo/code-smells-js/badge)](https://www.codefactor.io/repository/github/jaysoo/code-smells-js)
[![Maintainability](https://api.codeclimate.com/v1/badges/e7df21200bfdb12cafbd/maintainability)](https://codeclimate.com/github/jaysoo/code-smells-js/maintainability)

This repository is a demonstration of common code smells, and how each tool may help combat them.

## ESLint

ESLint can find, and even fix, many JavaScript problems.

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

For more information, see [examples/0-lint-errors.js](examples/0-lint-errors.js).

## Code climate

[https://codeclimate.com/](https://codeclimate.com/)

### Pros

- Supports eslint (including `.eslintrc.js`)
- Free for opensource.
- Supports both GitHub.com and GitHub enterprise.
- On-premises or private cloud in enterprise plan.
- Has advanced [configuration options](https://docs.codeclimate.com/docs/advanced-configuration#section-exclude-patterns)
- Supports coverage reports.
- Has *API* access, and integration with JIRA, Slack. Unsure about GitHub enterprise, will have to inquire.
- Provides *churn* chart -- so you can see hotspots where churn and complexity are high.

## Codefactor

[https://www.codefactor.io](https://www.codefactor.io)

### Pros

- Supports eslint (but not `.eslintrc.js`... must use `.eslintrc` which is less flexible)
- Free for opensource.
- Free for one private repo.

### Cons

- No GitHub enterprise support
- `.eslintrc.js` not supported, only the less powerful `.eslintrc`.
- Configuration is limited, checks are all or nothing.
  e.g. duplication does not support threshold, so cannot apply [Rule of Three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
- No coverage support.
- No *churn* support.
- No API and limited integrations (just GitHub.com and Slack).

## Codacy

[https://codacy.com](https://codacy.com)

### Pros

- Supports ESLint (including `.eslintrc.js`).
- Free for opensource.
- Supports both GitHub.com and GitHub enterprise.
- On-premises or private cloud in enterprise plan.
- Provides *churn* chart -- so you can see hotspots where churn and complexity are high.
- Provides *security* assessment, although it seems like mostly ESLint features.
- Has [*API*](https://support.codacy.com/hc/en-us/articles/207994675-Project-API)
  access, and integration with JIRA, Slack, WebHook. Unsure about GitHub enterprise, will have to inquire.
- Coverage support (through their API).

### Cons

- No code duplication detection.
- Looks like it's mostly a nice UI on top of ESLint, GoLint, etc.
- Seems to be lacking documentation on [API](https://support.codacy.com/hc/en-us/articles/207994675-Project-API).

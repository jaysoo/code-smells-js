# On Code Quality

When it comes to software development, one of the top priorities as an programmer is to ensure that our software is of high quality. But what is code quality exactly, and how do we enforce it?

In this article, I'll talk about:

1. The different facets of code quality.
2. How to enforce quality in your projects.
3. A look at code review services the provide quality checks.

All code examples will be in JavaScript, so some knowledge will help but isn't necessary.

## What do we mean by quality?

If you ask a hundred programmers what quality is, you will probably get a hundred different answers. However, there are some general themes that almost everyone can agree on.

### Cleanliness

The *cleanliness* of code is a combination of various factors.

* **Readability**: Is the code easy to read? Are the comments useful?
* **Simplicity**: Are functions as small as possible in scope and size? Is the code
  easy to reason about?
* **DRY**: Are duplicated behaviour captured for reused?

Cleanliness matters is because programmers arguably spend more time reading code than writing code. This is especially true if your team does code reviews. Thus, we owe it to ourselves to make sure our code is human readable.

Uncle Bob has a whole book dedicated to this topic called [Clean Code](https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882).
This book gives a lot of advice such as: giving variables and functions
*meaningful names*, making functions *small*, etc.

I think many clean code advice are subjective, but there are some objectively bad code smells (depending on the language and framework being used). Let's take a look at some examples in JavaScript.

**Unused variables:**

Here we have an example of actual code from Hubs UI.

```
rejectAdminRequest = async (request: Object) => {
  try {
    const res = await this.api.request('put', `/orgadmin/requests/${request.id}/reject`)
    this.AdminRequestsStore.remove(request)
    this.AlertsCommands.show(`Request successfully rejected`, SUCCESS)
  } catch (e) {
    console.error(e)
    this.AlertsCommands.show(`There was a problem with your request`, DANGER)
  }
}
```

Notice that the `res` variable is declared but never used. This means that a programmer scanning this method might unnecessarily be tracking this `res` variable when understanding the method's behaviour.

If we simply remove the variable altogether, then it makes the intention of the method more clear -- that is to only `await` on the result, but we don't care *what* the result is.

```
rejectAdminRequest = async (request: Object) => {
  try {
    await this.api.request('put', `/orgadmin/requests/${request.id}/reject`)
    //...
  } catch (e) {
    //...
  }
}
```

The same thing applies to unused function arguments. And while unused variables may not seem like a huge deal in a smaller function, once you each about 10-20 lines of code the effect on cognitive load becomes much more obvious.

**Mutable bindings:**

In the same vein as unused variables, mutable bindings also add cognitive load when scanning a function.

In JavaScript, we can use a `const` to declare an immutable binding, and `let`
to declare a mutable binding.

```
const x = 1
x = 2 // TypeError: Assignment to constant variable

let x = 1
x = 2 // OK!
```

Whenever possible, it is best to use `const` for variables to let programmers know that the binding cannot change, thus there is no need to keep track of the changes. In contrast, when a programmer sees a `let`, then they should be on the look out for where the binding changes, and how it affects program flow.

In both the *unused variables* and *mutable bindings* cases, the code smell is that they add to the cognitive load on the programmer when they are reasoning about code. We'll take a look at prevention later on in this article.
 
### Bug-free

Although not many programs can be provably bug-free, it is nevertheless
our goal as programmers to eliminate as many bugs as possible.

Software bugs can come in four main categories:

1. *Type errors*
2. *Logic errors*
3. *Performance*
4. *Security*

Type errors can be `null` errors, protocol mismatches, etc. For example,
accessing a property off a `null` value, or calling a function with the wrong
types.

Logic errors are bugs that cause the program to behave incorrectly. These
bugs might be caused by mistakes in control flow, wrong operator usages,
or perhaps mistakes in the business logic.

Performance bugs may means different things depending on the application. For a client-side application, this could mean large, bloated assets that unnecessarily increase load time. For a REST serivce, it could mean slow database access. Or perhaps an application becomes unresponsive. In all these cases, metrics with thresholds are needed to capture this type of bug. 

Security bugs are vulnerable spots in the application that a malicious person may exploit. Examples of common ones found on the web are cross-site-scripting (XSS), SQL injection, cross site request forgery (CSRF). There are also potential security vulnerabilities in third-party libraries used by an application (e.g. [nsp](https://nodesecurity.io/advisories) provides advisories for Node modules). 

Some bugs can be checked statically using tools, while others only manifest themselves during runtime. The latter can be much harder to detect and debug, so it is generally better to capture as many errors are possible during static analysis.
 
### Time factors

There are trade-offs that need to be considered when we discuss code quality. A piece of code that is thrown away after a few days is probably not worth the effort to ensure quality.

How code changes over time (*churn*) should also affect how we treat them. Modules that have high churn rate likely requires more tests at the boundary level to ensure it integrates correctly with the rest of the system. Meanwhile, code that rarely change might not require as much testing around it.

Lastly, software rot is also a real phenomenon. This means that even though code may not have changed, it will continue to decline in quality. This decline in quality may occur as a result of:

* Environment changes, such as operating system, browser, language specs, which might deprecate or outright break certain features.
* Outdated dependencies, leading to security bugs, performance bugs, etc.
* The application architecture has been changed throughout its lifetime, but some code are not refactored to reflect these changes. This leads to inconsistencies, which may result in bugs or a decrease in clarity.

It is important for us to keep *time* in our discussions on code quality.

## Enforcing code quality

Now that we have an understanding of what quality is and why it matters, how do we go about enforcing it in our software?

There are a few popular ways quality is enforced.

### Code reviews

Code reviews are common amongst many software teams. There are many benefits of doing code reviews, such as knowledge sharing. However, I would argue that code reviews are not great as a quality tool.

The amount of red flags that can be caught during a code review is completely dependent on the reviewer. As we all know, humans are very prone to error, and just because you received a *LGTM* review, it does not say much about the change in quality.

Obviously, I'm not saying to not do code reviews, they are great for a number of reasons. Just **don't rely on reviews to catch quality issues**.

### The QA person

The QA person -- which could be a developer -- ensures features behave correctly. It is necessary part of change management. However, when a manual test passes, it only passes for that one session and for the test case being tested. There are no safeguards for future changes.

When you add time to the equation, regressions become a major concern, so **it is better to have some automation in place *in addition* to manual testing**.

### Linting

Every mainstream language have linters that can be used. For JavaScript, the recommended linter is [`eslint`](https://eslint.org/). For TypeScript, you have [`tslint`](https://palantir.github.io/tslint/). Python has [`pylint`](https://www.pylint.org/). You get the idea.

A linter performs static analysis on your code, and informs you when there are any red flags, such as bugs or stylistic errors.

The *unused variable* and *mutable bindings* code smells mentioned previously can both be caught using `eslint`.

There are numerous other logic errors that can be caught with `eslint` as well, such as:

*Using `==` instead of `===`:*

Since `==` often leads to coercion bugs in JavaScript, a linter can enforce that `===` is always required.

**Assignment in condition:**

When assignment is done in a condition, it is almost always a logic error.

e.g. If you write:

```
if (x = 1) {
  console.log('x is one!')
}
```

You actually meant to write:

```
if (x === 1) {
  console.log('x is one!)
}
```

A linter will pick up this errors.

**Unreachable code:**

Perhaps a less-known fact about JavaScript is that adding a newline after `return` keyword will result in that function returning `undefined`.

```
function foo()
{
  return
  {
    message: 'Hello!'
  }
}
```

This is why it is always recommended to inline opening curly braces (`{`) with the 
function declaration and `return` statements.

Other unreachable code can occur when a function multiple return statements or potential errors.

```
// 'done' is never logged due to `return` and error in if-else.
function f() {
  if (Math.random() < 0.5) {
    return
  } else {
    throw new Error()
  }
  console.log('done')
}

// 'done' is never logged because all branches are exhausted.
function fold(state, action) {
  switch (action.type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    default:
      return state
  }
  console.log('done')
}
```

**Complexity:**

The most common way complexity is measured is *cyclomatic complexity*. This is a measurement of the number of independent paths through a program.

Take this program for example:

```
function f(x) {
  if (true) {
      return x // 1st path
  } else if (false) {
      return x + 1 // 2nd path
  } else {
      return 4 // 3rd path
  }
}
```

The cyclomatic complexity here is `3`. If you configured `eslint` to enforce a max value of `2`, then this program will not pass the lint test. The default maximum in `eslint` is `20`, and you can change this based on what makes sense for your own projects.

As you can see, **adding a linter to your project is highly valuable**. A linter will catch many errors that will slip through code reviews and manual testing. As a bonus, there are many rules that `eslint` can automatically fix for you with the `--fix` option.

### Type system

A type is a collection of possible values. A `boolean` can be `true` or `false`, a `number` can be `0`, `1`, `2`, etc.

If a language allows the programmer to specify types within the program, then a type checker can be used to test if the program is type sound.

For example, if I write the following `add` function.

```
function add(a, b) {
  return a + b
}
```

Then in JavaScript, all of the following are valid statements.

```
add(null, null)
add({}, [])
add(true, 100)
```

Even though we can clearly see that the invocations are using wrong types.

With TypeScript, you can annotation your functions with expected types.

```
function add(a: number, b: number) {
  return a + b
}
```

Then when the TS compiler checks the code, it will result in a type error.

A type system affords the developer the ability to document design directly in code, which improves clarity. A type checker can then automatically validate the type soundness of the program. Types also helps eliminate a whole class of errors (type errors), which reduces the amount of bugs that can exist in the program.
There is [paper](http://ttendency.cs.ucl.ac.uk/projects/type_study/documents/type_study.pdf) which shows that adding TypeScript or Flow to existing opensource projects can lead to a *15% reduction in bugs*.

The more expressive a type system is, the more a type checker can do. For example, in Java the type system cannot guard against `null` values, but in Kotlin it can. In Haskell, the type checker cannot validate runtime values, but in Idris you can write theorems that are predicated on values.

I highly recommend **adding types to your projects to reduce bug count**.

### Automated tests

With automated tests, you can check for correctness in program behaviour without manual testing. There are a variety of tests that can be written:

* Unit tests
* Integration tests
* Property-based tests
* ...

**Unit** tests provide assurance that the small units of your program behave correctly in *isolation*. These tests are example based, and thus do not guarantee correctness when integrated into the larger application.

**Integration** tests provide assurance that the units do behave correctly when integrated with each other. It is not possible to cover all branches of execution, thus integration tests can only *provide guarantees on a tiny fraction of all valid inputs*.

**Property-based** or generative tests are high-level specs of program behaviour given a *range* of input data. They provide stronger guarantees over unit and integration tests since the input data are randomly generated, and most frameworks provide at least a thousand input variants per property. Although more powerful in scope, they might be harder to write since examples aren't sufficient. You must think more carefully about the properties in your system under test. A few common properties are *commutativity*, *associativity*, *idempotency*, *two paths - same destination*, etc.

There are much more to say on the topic of testing, however within the discussion of code quality, there are a few ways testing can help.

* Tests can provide **documentation** on how a program can be used, and how it behaves.
* A test suite with good coverage provide some guards against **regression**.
* Tests (especially property-based testing) can catch many **logical and performance errors** before they hit production.

I highly recommend **adding adequate amount of tests to your projects** in order to improve code clarity and reduce bug count. What "adequate" means to your application is something you have to figure out.

### Services

There are also code review services that will check your code for quality automatically. A few of the most popular ones currently are:

* [Code Climate](https://codeclimate.com/)
* [CodeFactor](http://codefactor.io/)
* [Codacy](https://codacy.com)

In this section I will give a brief overview of the features provided by each service, and then give a recommendation on whether they are worth using.

#### Code Climate

**Pros:**

* Supports all popular linters.
* Detects code duplication.
* Detects security vulnerabilities in third-party libraries using plugins (e.g. nsp for NodeJS).
* Provides a "maintainability" score in "days to resolve technical debt", but I question its usefulness.
* Free for opensource.
* Supports both GitHub.com and GitHub enterprise.
* On-premises or private cloud in enterprise plan.
* Has advanced [configuration options](https://docs.codeclimate.com/docs/advanced-configuration#section-exclude-patterns)
* Supports coverage reports.
* Has *API* access, and integration with JIRA, Slack. Unsure about GitHub enterprise, will have to inquire.
* Provides *churn* chart -- so you can see hotspots where churn and complexity are the highest.

**Cons:**

* Highest cost when compared with CodeFactor and Codacy.

#### CodeFactor

**Pros:**

* Supports all popular linters, but for `eslint`, it does not support `.eslintrc.js` for configuration.
* Detects code duplication.
* Free for opensource.
* Free for one private repository.

**Cons:**

* No GitHub enterprise support
* `.eslintrc.js` not supported, only the less powerful `.eslintrc`.
* Configuration is limited, checks are all or nothing.
* e.g. duplication does not support threshold, so cannot apply [Rule of Three](https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming))
* No coverage support.
* No *churn* support.
* No API and limited integrations (just GitHub.com and Slack).

#### Codacy

**Pros:**

* Supports all popular linters.
* Free for opensource.
* Provides *security* assessment, although for Node is seems to be a wrapper around nsp.
* Supports both GitHub.com and GitHub enterprise.
* On-premises or private cloud in enterprise plan.
* Provides *churn* chart -- so you can see hotspots where churn and complexity are the highest.
* Has [*API*](https://support.codacy.com/hc/en-us/articles/207994675-Project-API)
* access, and integration with JIRA, Slack, WebHook. Unsure about GitHub enterprise, will have to inquire.
* Coverage support (through their API).

**Cons:**

* No code duplication detection.
* Looks like it's mostly a nice UI on top of ESLint, GoLint, etc.
* Seems to be lacking documentation on [API](https://support.codacy.com/hc/en-us/articles/207994675-Project-API).

#### Recommendation

I found that none of the services provide much value beyond what a linter can give you for *free*. Code Climate and Codacy reports on code churn, which may be somewhat useful.

When it comes to *security audits* on third-party libraries, you can already get it for free in most languages (e.g. nsp for NodeJS, `bundler-audit` for Ruby).

I think by adding a linter and security auditing tools to your project, you can get 80-90% of the features that these code review services provide -- and all for free!

The one aspect of these services that may be useful is to see trends over time. If code coverage is in a downward trend, then it should prompt some action. A chart of *churn vs. maintainability* could be useful too, but only if the maintainability metric is useful.

My recommendation is to start with free tools (linters, type checkers, security audits) and add them to your continuous integration pipeline. **Do your own analysis on code review services to weigh the pros and cons**.

## In closing

We looked at various factors that contribute to the quality of our code.

* **Cleanliness**
* **Bugs**
* **Time**

We took a whirlwind tour of tools and services that will help us enforce the quality of our application code.

The easiest way to get started with ensuring quality is to add a linter and types (if applicable) to your application. For example, for JavaScript projects, add `eslint` and consider migrating to either TypeScript or Flow.

Adding security auditing tools for third-party libraries is free, and very low-friction.

If you are considering adopting a code review service, I recommend that you do further research. If I had to choose one, I'd go with Code Climate since it's the most mature, and provides the most features.

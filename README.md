# eslint-plugin-smt

Remember to install the dependencies after cloning:

```shell
$ git clone https://github.com/smt/eslint-plugin-smt.git
$ cd eslint-plugin-smt
$ npm install
```

To test a rule in isolation, run a command similar to:

```shell
$ eslint --reset --no-eslintrc \
  --rule "'ng-annotate-arg-order': 1" \
  --rulesdir ./lib/rules \
  tests/example1.js
```

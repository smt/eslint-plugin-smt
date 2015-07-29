# eslint-plugin-smt

Remember to install the dependencies after cloning:

```shell
$ git clone https://github.com/smt/eslint-plugin-smt.git
$ cd eslint-plugin-smt
$ npm install
```

To test a rule in isolation with `eslint`, run a command similar to:

```shell
$ ./node_modules/eslint/bin/eslint.js --reset --no-eslintrc \
  --rule "'ng-annotate-arg-order': 1" \
  --rulesdir ./lib/rules \
  tests/*.js
```

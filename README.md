# eslint-plugin-smt

To test a rule in isolation, run a command similar to:

```shell
$ eslint --reset --no-eslintrc \
  --rule "'ng-annotate-arg-order': 1" \
  --rulesdir ./lib/rules \
  tests/example1.js
```

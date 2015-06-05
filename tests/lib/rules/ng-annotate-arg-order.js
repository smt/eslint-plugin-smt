/**
 * @fileoverview Tests for ng-annotate-arg-order rule
 * @author Stephen Tudor <STudor@anthropologie.com>
 * @copyright 2015 Anthropologie. All rights reserved.
 */
'use strict';

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

var eslint = require('eslint');
var ESLintTester = require('eslint-tester');

// ----------------------------------------------------------------------------
// Tests
// ----------------------------------------------------------------------------

var eslintTester = new ESLintTester(eslint);
eslintTester.addRuleTest('lib/rules/output-ast', {
    valid: [
        { code: 'function () {}' },
        { code: 'module.exports = /*@ngInject*/ function (a,b,c) {}' },
        { code: 'module.exports = /*@ngInject*/ function (1,B,a) {}' }
    ],
    invalid: [
        { code: 'module.exports = /*@ngInject*/ function (b,a,c) {}' },
        { code: 'module.exports = /*@ngInject*/ function (a,B,c) {}' },
        { code: 'module.exports = /*@ngInject*/ function (a,b,1) {}' }
    ]
})

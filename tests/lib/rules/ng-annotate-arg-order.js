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
eslintTester.addRuleTest('lib/rules/ng-annotate-arg-order', {
    valid: [
        'module.exports = function (a,b,c) {}',
        'module.exports = function (c,b,a) {}',
        'module.exports = /*@ngInject*/ function (a,b,c) {}',
        'module.exports = /*@ngInject*/ function (1,B,a) {}'
    ],
    invalid: [
        {
            code: 'module.exports = /*@ngInject*/ function (b,a,c) {}',
            errors: [
                { message: 'Found argument identifier out of alphabetical order' }
            ]
        },
        {
            code: 'module.exports = /*@ngInject*/ function (a,B,c) {}',
            errors: [
                { message: 'Found argument identifier out of alphabetical order' }
            ]
        },
        {
            code: 'module.exports = /*@ngInject*/ function (a,b,1) {}',
            errors: [
                { message: 'Found argument identifier out of alphabetical order' }
            ]
        }
    ]
})

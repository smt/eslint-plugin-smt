/**
 * @fileoverview Tests for output-ast rule
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
    valid: [],
    invalid: []
})

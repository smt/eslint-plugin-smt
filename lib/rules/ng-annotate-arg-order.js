/**
 * @fileoverview Rule to flag when any arguments in modules that use ngAnnotate are out of lexigraphical order.
 * @author Stephen Tudor <STudor@anthropologie.com>
 * @copyright 2015 Anthropologie. All rights reserved.
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

/**
 * Report arguments that are out of lexigraphical order in a function
 * expression that is marked with an ng-annotate block comment.
 *
 * @param {Object} context Contains information and additional functionality that is relevant to the context of the rule.
 * @returns {Object} The eslint rule definition
 */
module.exports = function ngAnnotateArgOrder (context) {
    return {
        /**
         * Check all AssignmentExpression nodes, and if one matches the
         * signature of a function expression marked with an ng-annotate block
         * comment, ensure that its arguments are in lexigraphical order.
         * @method
         * @param {Object} node Leaf node of the AST for an AssignmentExpression
         * @returns {void}
         */
        AssignmentExpression: function assignmentExpressionRule (node) {
            /**
             * The prefix of the key pattern to search the node source for.
             * @var {String}
             */
            var patternPrefix = 'module\.exports';

            /**
             * The suffix of the key pattern to search the node source for.
             * @var {String}
             */
            var patternSuffix = ' = /*@ngInject*/';

            /**
             * Use to replace string with an escaped version suitable for
             * conversion into a RegExp.
             * @var {RegExp}
             */
            var escapeMask = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

            /**
             * A literal string of the JS source of the left side of the
             * assignment, starting at char 0 and ending at char 16.
             * @var {String}
             */
            var source = context.getSource(node.left, 0, patternSuffix.length);

            /**
             * @function
             * @param {String} pattern The full pattern to search the node source for.
             * @returns {RegExp} The escaped RegExp form of the key pattern.
             */
            function createEscapedRegex (pattern) {
                var escaped = pattern.replace(escapeMask, '\\$&');

                return new RegExp(escaped);
            }

            /**
             * Compare each argument name, and report when any name is out of
             * lexigraphical order with the previous one. This function is
             * bound to context.
             * @function
             * @param {Object} prev The param from the previous iteration, for comparison with the current param
             * @param {Object} curr The current param
             * @returns {Object} The param to be passed to the next iteration as `prev`
             */
            function paramsReducer (prev, curr) {
                if (prev.name > curr.name) {
                    this.report(node, 'Found argument identifier out of lexigraphical order');
                }
                return curr;
            }

            // Look for the ng-annotate block comment and ensure the right side
            // of the assignment is a function expression
            if (createEscapedRegex(patternPrefix + patternSuffix).test(source) &&
                    node.right.type === 'FunctionExpression') {
                // Iterate over all of the function expression's arguments
                node.right.params.reduce(paramsReducer.bind(context), { name: '' });
            }
        }
    };
};

module.exports.schema = [
];

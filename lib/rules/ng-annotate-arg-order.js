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
 * @returns {Object}
 */
module.exports = function ngAnnotateArgOrder (context) {
    return {
        /**
         * Check all AssignmentExpression nodes, and if one matches the
         * signature of a function expression marked with an ng-annotate block
         * comment, ensure that its arguments are in lexigraphical order.
         * @method
         * @param {Object} node Leaf node of the AST for an AssignmentExpression
         */
        AssignmentExpression: function assignmentExpressionRule (node) {
            /**
             * A literal string of the JS source of the left side of the
             * assignment, starting at char 0 and ending at char 16.
             * @type {String}
             */
            var source = context.getSource(node.left, 0, 16);

            /**
             * Compare each argument name, and report when any name is out of
             * lexigraphical order with the previous one.
             * @function
             * @param {Object} prev The param from the previous iteration, for comparison with the current param
             * @param {Object} curr The current param
             * @returns {Object}
             */
            var paramsReducer = function paramsReducer (prev, curr) {
                if (prev.name > curr.name) {
                    context.report(node, 'Found argument identifier out of lexigraphical order');
                }
                return curr;
            };

            // Look for the ng-annotate block comment and ensure the right side
            // of the assignment is a function expression
            if (source.match(/module\.exports = \/\*@ngInject\*\//) && node.right.type === 'FunctionExpression') {
                // Iterate over all of the function expression's arguments
                node.right.params.reduce(paramsReducer, { name: '' });
            }
        }
    };
};

module.exports.schema = [
];

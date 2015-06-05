/**
 * @fileoverview Rule to flag non-alphabetical arguments in modules that use ngAnnotate
 * @author Stephen Tudor <STudor@anthropologie.com>
 * @copyright 2015 Anthropologie. All rights reserved.
 */
'use strict';

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

module.exports = function ngAnnotateArgOrder (context) {
    return {
        AssignmentExpression: function assignExp (node) {
            var source = context.getSource(node.left, 0, 16);
            if (/module\.exports = \/\*@ngInject\*\//.test(source) && node.right.type === 'FunctionExpression') {
                node.right.params.reduce(function paramsReducer (prev, param) {
                    if (prev.name > param.name) {
                        context.report(node, 'Found argument identifier out of alphabetical order');
                    }
                    return param;
                });
            }
        }
    };
};

module.exports.schema = [
];

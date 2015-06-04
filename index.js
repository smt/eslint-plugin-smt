/**
 * @fileoverview Test Plugin
 * @author Stephen Tudor <STudor@anthropologie.com>
 * @copyright 2015 Anthropologie. All rights reserved.
 */
'use strict';

module.exports = {
    rules: {
        'output-ast': require('./lib/rules/outputAst')
    },
    rulesConfig: {
        'output-ast': 1
    }
};

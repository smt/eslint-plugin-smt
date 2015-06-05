/**
 * @fileoverview Test Plugin
 * @author Stephen Tudor <STudor@anthropologie.com>
 * @copyright 2015 Anthropologie. All rights reserved.
 */
'use strict';

module.exports = {
    rules: {
        'ng-annotate-arg-order': require('./lib/rules/ng-annotate-arg-order')
    },
    rulesConfig: {
        'ng-annotate-arg-order': 1
    }
};

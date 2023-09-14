/**
 * @fileoverview Prevent usage of unknown DOM property
 * @author Yannick Croissant
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const classname_utils_1 = require("../utils/classname_utils");
const tailwind_helper_1 = require("../utils/helpers/tailwind_helper");
const resolveConfig = require('tailwindcss/resolveConfig');
const tailwindConfig = require('../../../../tailwind.config');
// import tailwindConfig  from '../../../../tailwind.config'
const fullConfig = resolveConfig(tailwindConfig);
const appColorDict = (0, tailwind_helper_1.generateColorDict)(fullConfig.theme.colors);
function showReport(context, node, tagValue) {
    context.report({
        node,
        message: `fix tw original className in the react-native.`,
        fix: function (fixer) {
            return fixer.replaceTextRange([node.range[0] + 1, node.range[1] - 1], (0, classname_utils_1.getOriginalTWClassNames)(tagValue, appColorDict));
        },
        suggest: [
            {
                desc: `Fix tw original className, This maintains the current functionality.`,
                fix: function (fixer) {
                    return fixer.replaceTextRange([node.range[0] + 1, node.range[1] - 1], (0, classname_utils_1.getOriginalTWClassNames)(tagValue, appColorDict));
                }
            }
        ]
    });
}
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Description of the rule'
        },
        hasSuggestions: true,
        fixable: 'code',
        schema: [] // no options
    },
    create(context) {
        var sourceCode = context.getSourceCode().text;
        // console.log('tailwind:color length', (tailwindConfig.theme.extend.colors||[]))
        // console.log("tailwind theme extend colors: xxx",fullConfig.theme.extend.colors)
        // console.log("tailwind file: 234",fullConfig.theme.size)
        return {
            Literal: function (node) {
                // JSXAttribute: function (node) {
                // JSXOpeningElement: function (node) {
                // JSXIdentifier: function (node) {
                const parentNode = node.parent;
                // console.log('node:', node)
                if (parentNode.type === 'JSXAttribute' &&
                    (parentNode.name.name === 'className' || parentNode.name.name === 'class')) {
                    const tagValue = node.value;
                    if (typeof tagValue === 'string' && (0, classname_utils_1.checkColorAndSizeClassNames)(tagValue, appColorDict)) {
                        // console.log('node:', node)
                        showReport(context, node, tagValue);
                    }
                }
            }
        };
    }
};
//# sourceMappingURL=tw-original-classname.js.map
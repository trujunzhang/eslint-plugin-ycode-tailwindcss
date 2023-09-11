/**
 * @fileoverview Prevent usage of unknown DOM property
 * @author Yannick Croissant
 */
'use strict';
module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Description of the rule'
        },
        messages: {
            unnecessaryEscape: 'Unnecessary escape character: \\{{character}}.',
            removeEscape: 'Remove the `\\`. This maintains the current functionality.',
            escapeBackslash: 'Replace the `\\` with `\\\\` to include the actual backslash character.'
        },
        fixable: 'code',
        schema: [] // no options
    },
    create(context) {
        var sourceCode = context.getSourceCode().text;
        var isReactNative = sourceCode.includes('RTView') || sourceCode.includes('RTText');
        console.log('isReactNative', isReactNative);
        // console.log('sourceCode:', JSON.stringify(sourceCode))
        return {
            Identifier: function (node) {
                // if (node.name.length === 1)
                if (node.name === 'djzhang') {
                    console.log('eslint<no-single-letter>:', node.name);
                    // console.log('eslint<no-single-letter>:', node)
                    context.report({
                        node,
                        message: 'Avoid single-letter identifiers',
                        suggest: [
                            {
                                messageId: 'removeEscape',
                                fix(fixer) {
                                    // return fixer.replaceTextRange(
                                    //   node.range[0],
                                    //   node.range[1],
                                    //   'xyz123'
                                    // )
                                    // return fixer.insertTextAfter(node, ';xyz-123')
                                    return fixer.replaceText(node.name, ';xyz-123');
                                }
                            }
                        ]
                    });
                }
            }
        };
    }
};
//# sourceMappingURL=no-single-letter.js.map
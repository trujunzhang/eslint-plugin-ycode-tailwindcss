/**
 * @fileoverview Prevent usage of unknown DOM property
 * @author Yannick Croissant
 */

'use strict'

const { checkColorAndSizeClassNames, getOriginalTWClassNames } = require('../utils/classname_utils')

function showReport(isReactNative, context, node, tagValue) {
  context.report({
    node,
    message: `fix tw original className in the react-native.`,
    fix: function (fixer) {
      if (isReactNative) {
        return fixer.replaceTextRange([node.range[0] + 1, node.range[1] - 1], getOriginalTWClassNames(tagValue))
      }
      return null
    },
    suggest: [
      {
        desc: `Fix tw original className, This maintains the current functionality.`,
        fix: function (fixer) {
          if (isReactNative) {
            return fixer.replaceTextRange([node.range[0] + 1, node.range[1] - 1], getOriginalTWClassNames(tagValue))
          }
          return null
        }
      }
    ]
  })
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
    var sourceCode = context.getSourceCode().text
    var isReactNative = sourceCode.includes('as Div') || sourceCode.includes('@shared-theme/components')
    // console.log('isReactNative', isReactNative)
    return {
      Literal: function (node) {
        // JSXAttribute: function (node) {
        // JSXOpeningElement: function (node) {
        // JSXIdentifier: function (node) {
        const parentNode = node.parent

        // console.log('node:', node)
        if (
          parentNode.type === 'JSXAttribute' &&
          (parentNode.name.name === 'className' || parentNode.name.name === 'class')
        ) {
          const tagValue = node.value
          if (typeof tagValue === 'string' && checkColorAndSizeClassNames(tagValue)) {
            // console.log('node:', node)
            showReport(isReactNative, context, node, tagValue)
          }
        }
      }
    }
  }
}

/**
 * @fileoverview Prevent usage of unknown DOM property
 * @author Yannick Croissant
 */

'use strict'

/**
 * Extracts the tag name for the JSXAttribute
 * @param {JSXAttribute} node - JSXAttribute being tested.
 * @returns {String|null} tag name
 */
function getTagName(node) {
  if (node && node.parent && node.parent.name && node.parent.name) {
    return node.parent.name.name
  }
  return null
}

function showReport(isReactNative, context, node, tagName, fixTagName) {
  context.report({
    node,
    message: `No low ${tagName} tags in the react-native.`,
    fix: function (fixer) {
      if (isReactNative) {
        return fixer.replaceTextRange(node.range, fixTagName)
      }
      return null
    },
    suggest: [
      {
        desc: `Uppper the ${tagName} tag, This maintains the current functionality.`,
        fix: function (fixer) {
          if (isReactNative) {
            return fixer.replaceTextRange(node.range, fixTagName)
          }
          return null
        }
      }
    ]
  })
}

const tagsDict = {
  div: 'Div',
  img: 'Img',
  text: 'Text',
  h1: 'H1',
  h2: 'H2',
  h3: 'H3',
  h4: 'H4',
  h5: 'H5',
  h6: 'H6'
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
      // Tag: function (node) {
      // JSXAttribute: function (node) {
      // JSXOpeningElement: function (node) {
      JSXIdentifier: function (node) {
        const tagName = node.name

        // Upper 'div' to 'Div'
        if (
          tagName === 'div' || // div
          tagName === 'img' || // img
          tagName === 'text' || // text
          tagName === 'h1' || // h1
          tagName === 'h2' || // h2
          tagName === 'h3' || // h3
          tagName === 'h4' || // h4
          tagName === 'h5' || // h5
          tagName === 'h6' // h6
        ) {
          showReport(isReactNative, context, node, tagName, tagsDict[tagName])
        }
      }
    }
  }
}

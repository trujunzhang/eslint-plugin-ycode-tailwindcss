const tailwindConfig = require('../../../../tailwind.config')

const tailwindExtendColors = tailwindConfig.theme.extend.colors || []

function mergeTailwindColors(colors) {

  return {
    ...colors,
    ...tailwindExtendColors
  }
}

function generateColorDict(colors) {
  const colorNames = {}
  Object.keys(colors).map((key) => {
    const color = colors[key]
    if (color && typeof color === 'object') {
      Object.keys(color).map((subKey) => {
        const subColor = color[subKey]
        colorNames[subColor] = key + '-' + subKey;
      })
    } else {
      colorNames[color] = key
    }
  })
  return colorNames
}



module.exports = { generateColorDict }
